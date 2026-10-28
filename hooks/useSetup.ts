import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { useGame } from '@/hooks/useGame';
import { type GameMode } from '@/services/gameService';
export function useSetup(requestedPack = 'general') {
  const router = useRouter();
  const { startGame, unlocked, loaded } = useGame();
  const initialPack = unlocked.includes(requestedPack) ? requestedPack : 'general';
  const [first, setFirst] = useState('فريق الصقور');
  const [second, setSecond] = useState('فريق النمور');
  const [rounds, setRounds] = useState(initialPack === 'general' ? 4 : 2);
  const [mode, setMode] = useState<GameMode>('classic');
  const [pack, setPack] = useState(initialPack);
  const [error, setError] = useState('');
  const choosePack = useCallback((id: string) => { setPack(id); if (id !== 'general') setRounds(2); }, []);
  const start = useCallback(() => {
    if (!first.trim() || !second.trim()) { setError('أدخل اسمًا لكل فريق قبل البدء.'); return; }
    if (first.trim() === second.trim()) { setError('اختر اسمين مختلفين لتمييز الفريقين.'); return; }
    setError(''); startGame([first, second], rounds, mode, pack); router.push('/game');
  }, [first, second, rounds, mode, pack, startGame, router]);
  return { first, second, setFirst, setSecond, rounds, setRounds, mode, setMode, pack, choosePack, error, start, unlocked, loaded };
}
