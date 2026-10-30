import { useContext, useCallback } from 'react';
import { SettingsContext } from '@/contexts/SettingsContext';
import { messages, type MessageKey } from '@/constants/i18n';
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  const { language } = context;
  const t = useCallback((key: MessageKey) => messages[key][language], [language]);
  const tr = useCallback((ar: string, en: string, fr: string) => ({ ar, en, fr })[language], [language]);
  const number = useCallback((value: number) => value.toLocaleString(language), [language]);
  return { ...context, t, tr, number, rtl: language === 'ar' };
}
