import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { defaultSettings, loadSettings, saveSettings, type Settings } from '@/services/settingsService';
export type SettingsContextType = Settings & { ready: boolean; updateSettings: (change: Partial<Settings>) => void };
export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [ready, setReady] = useState(false);
  const queue = useRef(Promise.resolve());
  useEffect(() => { let mounted = true; void loadSettings().then(value => { if (mounted) { setSettings(value); setReady(true); } }); return () => { mounted = false; }; }, []);
  useEffect(() => { if (ready) queue.current = queue.current.then(() => saveSettings(settings)).catch(() => undefined); }, [ready, settings]);
  const updateSettings = useCallback((change: Partial<Settings>) => setSettings(old => ({ ...old, ...change })), []);
  return <SettingsContext.Provider value={{ ...settings, ready, updateSettings }}>{children}</SettingsContext.Provider>;
}
