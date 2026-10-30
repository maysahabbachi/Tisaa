import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { buyPack, fetchStore, isPurchaseCancelled, loadCachedEntitlements, restorePacks, storeStatus, type StorePackage } from '@/services/purchaseService';
import { useAlert } from '@/template';
import { useSettings } from './useSettings';
export function useStore() {
  const [unlocked, setUnlocked] = useState<string[]>(['general']);
  const [products, setProducts] = useState<StorePackage[]>([]);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const lock = useRef(false);
  const generation = useRef(0);
  const mounted = useRef(true);
  const status = storeStatus();
  const { showAlert } = useAlert();
  const { t } = useSettings();
  const refresh = useCallback(async () => {
    if (lock.current) return;
    const currentGeneration = generation.current;
    try { const snapshot = await fetchStore(); if (mounted.current && !lock.current && currentGeneration === generation.current) { setUnlocked(snapshot.unlocked); setProducts(snapshot.products); } } catch { /* Previously verified local entitlements continue offline. */ }
  }, []);
  useEffect(() => {
    mounted.current = true;
    void loadCachedEntitlements().then(ids => { if (mounted.current) { setUnlocked(ids); setLoaded(true); void refresh(); } });
    const sub = AppState.addEventListener('change', state => { if (state === 'active') void refresh(); });
    return () => { mounted.current = false; sub.remove(); };
  }, [refresh]);
  const transact = useCallback(async (id?: string): Promise<boolean> => {
    if (lock.current) return false;
    if (status !== 'ready') { showAlert(t('storeSection'), t(status === 'notConfigured' ? 'storeNotReady' : 'nativeOnly')); return false; }
    lock.current = true; generation.current++; setBusy(true);
    try {
      const ids = id ? await buyPack(id) : await restorePacks();
      if (mounted.current) { setUnlocked(ids); if (!id) showAlert(t('restore'), t(ids.length > 1 ? 'restoreDone' : 'restoreEmpty')); }
      return true;
    } catch (error) {
      if (!isPurchaseCancelled(error) && mounted.current) showAlert(t('storeSection'), t(error instanceof Error && error.message === 'PRODUCT_UNAVAILABLE' ? 'storeUnavailable' : 'purchaseError'));
      return false;
    } finally { lock.current = false; if (mounted.current) setBusy(false); }
  }, [status, showAlert, t]);
  const purchase = useCallback((id: string) => transact(id), [transact]);
  const restore = useCallback(() => transact(), [transact]);
  return { unlocked, products, busy, loaded, status, purchase, restore, refresh };
}
