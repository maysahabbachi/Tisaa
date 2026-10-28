import { createContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { createTeams, getDeck, loadLocal, saveLocal, type GameMode, type LastGame, type Question, type Team } from '@/services/gameService';

type Phase = 'ready' | 'playing' | 'review' | 'done';
type GameState = {
  teams: Team[]; mode: GameMode; deck: Question[]; turn: number; turns: number; phase: Phase;
  seconds: number; selected: number[]; roundScore: number; streak: number; doubled: boolean;
};
type GameContextType = GameState & {
  unlocked: string[]; lastGame: LastGame | null; loaded: boolean;
  startGame: (names: string[], rounds: number, mode: GameMode, pack: string) => void;
  beginTurn: () => void; selectAnswer: (index: number) => void; endTurn: () => void;
  nextTurn: () => void; abandonGame: () => void; useJoker: (kind: 'double' | 'time' | 'skip') => void; unlockPack: (id: string) => void;
};
export const GameContext = createContext<GameContextType | undefined>(undefined);
const initial: GameState = { teams: [], mode: 'classic', deck: [], turn: 0, turns: 8, phase: 'ready', seconds: 60, selected: [], roundScore: 0, streak: 0, doubled: false };
export function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<GameState>(initial);
  const [unlocked, setUnlocked] = useState<string[]>(['general']);
  const [lastGame, setLastGame] = useState<LastGame | null>(null);
  const [loaded, setLoaded] = useState(false);
  const hydrated = useRef(false);
  const deadline = useRef(0);
  useEffect(() => { let active = true; loadLocal().then(data => { if (active) { setUnlocked(data.unlocked); setLastGame(data.lastGame); hydrated.current = true; setLoaded(true); } }); return () => { active = false; }; }, []);
  useEffect(() => { if (hydrated.current) { void saveLocal(unlocked, lastGame); } }, [unlocked, lastGame]);
  useEffect(() => {
    if (game.phase !== 'playing') return;
    const timer = setInterval(() => setGame(g => {
      if (g.phase !== 'playing') return g;
      const seconds = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      return seconds === 0 ? { ...g, seconds, phase: 'review' } : { ...g, seconds };
    }), 250);
    return () => clearInterval(timer);
  }, [game.phase]);
  const startGame = (names: string[], rounds: number, mode: GameMode, pack: string) => {
    const deck = getDeck(unlocked.includes(pack) ? pack : 'general');
    setGame({ ...initial, teams: createTeams(names), mode, deck, turns: rounds * names.length });
  };
  const beginTurn = () => {
    deadline.current = Date.now() + 60000;
    setGame(g => g.phase === 'ready' ? { ...g, phase: 'playing' } : g);
  };
  const abandonGame = () => { deadline.current = 0; setGame(initial); };
  const selectAnswer = (index: number) => setGame(g => {
    if (g.phase !== 'playing' || g.selected.includes(index)) return g;
    if (Date.now() >= deadline.current) return { ...g, seconds: 0, phase: 'review' };
    const answer = g.deck[g.turn % g.deck.length]?.answers[index];
    if (!answer) return g;
    const streak = answer.points > 0 ? g.streak + 1 : 0;
    const multiplier = g.mode === 'streak' && answer.points > 0 ? Math.min(3, streak) : 1;
    const points = answer.points * multiplier * (g.doubled && answer.points > 0 ? 2 : 1);
    const selected = [...g.selected, index];
    return { ...g, selected, roundScore: g.roundScore + points, streak, phase: selected.length === 9 ? 'review' : 'playing' };
  });
  const endTurn = () => setGame(g => ({ ...g, phase: 'review' }));
  const nextTurn = () => setGame(g => {
    const teamIndex = g.turn % g.teams.length;
    const teams = g.teams.map((t, i) => i === teamIndex ? { ...t, score: t.score + g.roundScore } : t);
    const done = g.turn + 1 >= g.turns;
    return { ...g, teams, turn: done ? g.turn : g.turn + 1, phase: done ? 'done' : 'ready', seconds: 60, selected: [], roundScore: 0, streak: 0, doubled: false };
  });
  useEffect(() => {
    if (game.phase === 'done') setLastGame({ teams: game.teams.map(t => ({ name: t.name, score: t.score })), date: new Date().toISOString() });
  }, [game.phase, game.teams]);
  const useJoker = (kind: 'double' | 'time' | 'skip') => setGame(g => {
    if (g.phase !== 'playing') return g;
    const i = g.turn % g.teams.length;
    if (!g.teams[i]?.jokers[kind]) return g;
    const teams = g.teams.map((t, j) => j === i ? { ...t, jokers: { ...t.jokers, [kind]: false } } : t);
    if (kind === 'double') return { ...g, teams, doubled: true };
    if (kind === 'time') { deadline.current += 15000; return { ...g, teams, seconds: g.seconds + 15 }; }
    const deck = [...g.deck];
    const current = g.turn % deck.length;
    const alternative = (current + 1) % deck.length;
    [deck[current], deck[alternative]] = [deck[alternative], deck[current]];
    deadline.current = Date.now() + 60000;
    return { ...g, teams, deck, selected: [], roundScore: 0, streak: 0, seconds: 60 };
  });
  const unlockPack = (id: string) => setUnlocked(old => old.includes(id) ? old : [...old, id]);
  return <GameContext.Provider value={{ ...game, unlocked, lastGame, loaded, startGame, beginTurn, selectAnswer, endTurn, nextTurn, abandonGame, useJoker, unlockPack }}>{children}</GameContext.Provider>;
}
