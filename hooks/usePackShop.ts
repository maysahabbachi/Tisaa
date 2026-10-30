import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { useGame } from './useGame';
export function usePackShop() {
  const game = useGame();
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const openPack = useCallback((id: string) => { if (!game.loaded) return; if (game.unlocked.includes(id)) router.push({ pathname: '/setup', params: { pack: id } }); else setPreview(id); }, [game.unlocked, game.loaded, router]);
  const unlock = useCallback(async () => {
    if (!preview) return;
    const id = preview;
    if (await game.purchase(id)) { setPreview(null); router.push({ pathname: '/setup', params: { pack: id } }); }
  }, [preview, game.purchase, router]);
  const close = useCallback(() => { if (!game.busy) setPreview(null); }, [game.busy]);
  return { ...game, preview, openPack, unlock, close };
}
