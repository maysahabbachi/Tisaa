import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { useGame } from './useGame';
import { useSettings } from './useSettings';
import type { GameMode } from '@/services/gameService';
export function useSetup(requestedPack = 'general') {
  const router = useRouter();
  const { startGame, unlocked, loaded } = useGame();
  const { t } = useSettings();
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [rounds, setRounds] = useState(4);
  const [mode, setMode] = useState<GameMode>('classic');
  const [pack, setPack] = useState(requestedPack);
  const [error, setError] = useState<'missingNames' | 'duplicateNames' | null>(null);
  const choosePack = useCallback((id: string) => { setPack(id); }, []);
  const start = useCallback(() => {
    const names = [first.trim() || t('falcons'), second.trim() || t('tigers')];
    if (names[0].toLocaleLowerCase() === names[1].toLocaleLowerCase()) { setError('duplicateNames'); return; }
    setError(null); startGame(names, rounds, mode, pack); router.push('/game');
  }, [first, second, rounds, mode, pack, t, startGame, router]);
  return { first, second, setFirst, setSecond, rounds, setRounds, mode, setMode, pack: unlocked.includes(pack) ? pack : 'general', choosePack, error: error ? t(error) : '', start, unlocked, loaded };
}
