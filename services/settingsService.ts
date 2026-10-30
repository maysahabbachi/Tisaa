import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Language } from './content/types';
export type Settings = { language: Language; sound: boolean; haptics: boolean };
export const defaultSettings: Settings = { language: 'ar', sound: true, haptics: true };
export async function loadSettings(): Promise<Settings> {
  try {
    const raw = await AsyncStorage.getItem('tisaa-settings-v1');
    const saved = raw ? JSON.parse(raw) : {};
    return { language: ['ar', 'en', 'fr'].includes(saved.language) ? saved.language : 'ar', sound: typeof saved.sound === 'boolean' ? saved.sound : true, haptics: typeof saved.haptics === 'boolean' ? saved.haptics : true };
  } catch { return defaultSettings; }
}
export async function saveSettings(settings: Settings): Promise<void> { await AsyncStorage.setItem('tisaa-settings-v1', JSON.stringify(settings)); }
