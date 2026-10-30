import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createTeams, getDeck, loadLocal, saveLocal, type GameMode, type LastGame, type Question, type Team } from '@/services/gameService';
import { useSettings } from '@/hooks/useSettings';
import { useStore } from '@/hooks/useStore';
type Phase = 'ready' | 'playing' | 'review' | 'done';
type GameState = { teams: Team[]; mode: GameMode; deck: Question[]; turn: number; turns: number; phase: Phase; seconds: number; selected: number[]; roundScore: number; streak: number; doubled: boolean; swaps: number; pack: string };
type GameContextType = GameState & ReturnType<typeof useStore> & {
  lastGame: LastGame | null;
  startGame: (names: string[], rounds: number, mode: GameMode, pack: string) => void;
  beginTurn: () => void; selectAnswer: (index: number) => void; endTurn: () => void; nextTurn: () => void; abandonGame: () => void; useJoker: (kind: 'double' | 'time' | 'skip') => void;
};
export const GameContext = createContext<GameContextType | undefined>(undefined);
const initial: GameState = { teams: [], mode: 'classic', deck: [], turn: 0, turns: 8, phase: 'ready', seconds: 60, selected: [], roundScore: 0, streak: 0, doubled: false, swaps: 0, pack: 'general' };
export function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<GameState>(initial);
  const [lastGame, setLastGame] = useState<LastGame | null>(null);
  const [localReady, setLocalReady] = useState(false);
  const hydrated = useRef(false);
  const deadline = useRef(0);
  const { language, ready } = useSettings();
  const store = useStore();
  useEffect(() => { let active = true; void loadLocal().then(data => { if (active) { setLastGame(data.lastGame); hydrated.current = true; setLocalReady(true); } }); return () => { active = false; }; }, []);
  useEffect(() => { if (hydrated.current) void saveLocal(lastGame); }, [lastGame]);
  useEffect(() => {
    if (game.phase !== 'playing') return;
    const timer = setInterval(() => setGame(g => {
      if (g.phase !== 'playing') return g;
      const seconds = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      if (seconds === g.seconds) return g;
      return { ...g, seconds, phase: seconds === 0 ? 'review' : 'playing' };
    }), 200);
    return () => clearInterval(timer);
  }, [game.phase]);
  const startGame = useCallback((names: string[], rounds: number, mode: GameMode, requestedPack: string) => {
    const pack = store.unlocked.includes(requestedPack) ? requestedPack : 'general';
    const deck = getDeck(pack, language);
    const turns = Math.max(2, Math.min(Math.floor(rounds) * names.length, deck.length - names.length));
    setGame({ ...initial, teams: createTeams(names), mode, deck, turns, pack });
  }, [store.unlocked, language]);
  const beginTurn = useCallback(() => { if (game.phase !== 'ready') return; deadline.current = Date.now() + 60000; setGame(g => g.phase === 'ready' ? { ...g, phase: 'playing' } : g); }, [game.phase]);
  const abandonGame = useCallback(() => { deadline.current = 0; setGame(initial); }, []);
  const selectAnswer = useCallback((index: number) => setGame(g => {
    if (g.phase !== 'playing' || g.selected.includes(index)) return g;
    if (Date.now() >= deadline.current) return { ...g, seconds: 0, phase: 'review' };
    const answer = g.deck[g.turn]?.answers[index];
    if (!answer) return g;
    const streak = answer.points > 0 ? g.streak + 1 : 0;
    const multiplier = g.mode === 'streak' && answer.points > 0 ? Math.min(3, streak) : 1;
    const points = answer.points * multiplier * (g.doubled && answer.points > 0 ? 2 : 1);
    const selected = [...g.selected, index];
    return { ...g, selected, roundScore: g.roundScore + points, streak, phase: selected.length === 9 ? 'review' : 'playing' };
  }), []);
  const endTurn = useCallback(() => setGame(g => g.phase === 'playing' ? { ...g, phase: 'review' } : g), []);
  const nextTurn = useCallback(() => setGame(g => {
    if (g.phase !== 'review' || !g.teams.length) return g;
    const teamIndex = g.turn % g.teams.length;
    const teams = g.teams.map((t, i) => i === teamIndex ? { ...t, score: t.score + g.roundScore } : t);
    const done = g.turn + 1 >= g.turns;
    return { ...g, teams, turn: done ? g.turn : g.turn + 1, phase: done ? 'done' : 'ready', seconds: 60, selected: [], roundScore: 0, streak: 0, doubled: false };
  }), []);
  useEffect(() => { if (game.phase === 'done') setLastGame({ teams: game.teams.map(t => ({ name: t.name, score: t.score })), date: new Date().toISOString() }); }, [game.phase, game.teams]);
  const jokerLocks = useRef(new Set<string>());
  useEffect(() => { jokerLocks.current.clear(); }, [game.teams.length, game.turn, game.phase]);
  const useJoker = useCallback((kind: 'double' | 'time' | 'skip') => {
    const teamIndex = game.turn % Math.max(1, game.teams.length);
    const lock = `${game.turn}-${kind}`;
    if (game.phase !== 'playing' || Date.now() >= deadline.current || !game.teams[teamIndex]?.jokers[kind] || jokerLocks.current.has(lock)) return;
    const spare = game.turns + game.swaps;
    if (kind === 'skip' && !game.deck[spare]) return;
    jokerLocks.current.add(lock);
    // Update the deadline outside the state updater so Strict Mode cannot add time twice.
    if (kind === 'time') deadline.current += 15000;
    if (kind === 'skip') deadline.current = Date.now() + 60000;
    const seconds = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
    setGame(g => {
      if (g.phase !== 'playing' || g.turn !== game.turn || !g.teams[teamIndex]?.jokers[kind]) return g;
      const teams = g.teams.map((team, i) => i === teamIndex ? { ...team, jokers: { ...team.jokers, [kind]: false } } : team);
      if (kind === 'double') return { ...g, teams, doubled: true };
      if (kind === 'time') return { ...g, teams, seconds };
      const deck = [...g.deck];
      [deck[g.turn], deck[spare]] = [deck[spare], deck[g.turn]];
      return { ...g, teams, deck, swaps: g.swaps + 1, selected: [], roundScore: 0, streak: 0, seconds: 60 };
    });
  }, [game.phase, game.turn, game.teams, game.deck, game.turns, game.swaps]);
  return <GameContext.Provider value={{ ...game, ...store, loaded: localReady && ready && store.loaded, lastGame, startGame, beginTurn, selectAnswer, endTurn, nextTurn, abandonGame, useJoker }}>{children}</GameContext.Provider>;
}
