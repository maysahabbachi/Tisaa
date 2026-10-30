import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { createCuePlayer, vibrate, type Cue } from '@/services/effectsService';
import { useSettings } from './useSettings';
export function useEffects() {
  const { sound, haptics } = useSettings();
  const player = useRef<ReturnType<typeof createCuePlayer> | null>(null);
  const active = useRef(true);
  useEffect(() => {
    player.current = createCuePlayer();
    const sub = AppState.addEventListener('change', state => { active.current = state === 'active'; if (!active.current) player.current?.stop(); });
    return () => { sub.remove(); player.current?.dispose(); player.current = null; };
  }, []);
  useEffect(() => { if (!sound) player.current?.stop(); }, [sound]);
  const prime = useCallback(() => { if (sound) void player.current?.prime(); }, [sound]);
  const play = useCallback((cue: Cue) => {
    if (!active.current) return;
    if (sound) void player.current?.play(cue);
    if (haptics) void vibrate(cue);
  }, [sound, haptics]);
  return { prime, play };
}
