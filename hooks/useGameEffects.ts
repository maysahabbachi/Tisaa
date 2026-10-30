import { useEffect, useRef } from 'react';
import { useEffects } from './useEffects';
import type { Question } from '@/services/gameService';
type EffectGame = { phase: string; seconds: number; selected: number[]; deck: Question[]; turn: number };
export function useGameEffects(game: EffectGame) {
  const effects = useEffects();
  const previous = useRef({ seconds: 60, count: 0, question: '', phase: 'ready' });
  const question = game.deck[game.turn];
  useEffect(() => {
    const old = previous.current;
    const id = question?.id ?? '';
    if (id === old.question) {
      if (game.phase === 'playing' && game.seconds > 0 && game.seconds <= 10 && game.seconds !== old.seconds) effects.play('tick');
      if (game.phase === 'review' && old.phase === 'playing' && game.seconds === 0) effects.play('end');
      if (game.selected.length > old.count) {
        const last = game.selected[game.selected.length - 1];
        if ((question?.answers[last]?.points ?? 0) < 0) effects.play('trap');
      }
    }
    previous.current = { seconds: game.seconds, count: game.selected.length, question: id, phase: game.phase };
  }, [game.phase, game.seconds, game.selected, question, effects.play]);
  return effects;
}
