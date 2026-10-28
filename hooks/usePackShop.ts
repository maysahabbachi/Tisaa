import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { useGame } from '@/hooks/useGame';
import { useAlert } from '@/template';
export function usePackShop() {
  const { unlocked, unlockPack, loaded } = useGame();
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const { showAlert } = useAlert();
  const openPack = useCallback((id: string) => { if (!loaded) return; if (unlocked.includes(id)) router.push({ pathname: '/setup', params: { pack: id } }); else setPreview(id); }, [unlocked, router, loaded]);
  const unlock = useCallback(() => {
    if (!preview) return;
    const id = preview;
    showAlert('فتح حزمة تجريبي', 'لن يتم خصم أي مبلغ. هذه محاكاة لشراء الحزمة، وتُحفظ على هذا الجهاز فقط.', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'فتح للتجربة', onPress: () => { unlockPack(id); setPreview(null); router.push({ pathname: '/setup', params: { pack: id } }); } },
    ]);
  }, [preview, showAlert, unlockPack, router]);
  return { unlocked, preview, openPack, unlock, close: () => setPreview(null), loaded };
}
