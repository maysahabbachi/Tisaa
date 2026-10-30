import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
export type Cue = 'tick' | 'end' | 'trap' | 'test';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function base64(bytes: Uint8Array): string {
  let output = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i], b = bytes[i + 1], c = bytes[i + 2];
    output += alphabet[a >> 2] + alphabet[((a & 3) << 4) | ((b ?? 0) >> 4)] + (b === undefined ? '=' : alphabet[((b & 15) << 2) | ((c ?? 0) >> 6)]) + (c === undefined ? '=' : alphabet[c & 63]);
  }
  return output;
}
// Original synthesized tones: no external files, network requests or licensed audio.
function wave(cue: Cue): Uint8Array {
  const rate = 22050;
  const duration = cue === 'tick' ? 0.07 : cue === 'trap' ? 0.3 : 0.42;
  const length = Math.floor(rate * duration);
  const bytes = new Uint8Array(44 + length * 2);
  const view = new DataView(bytes.buffer);
  const ascii = (offset: number, value: string) => { for (let i = 0; i < value.length; i++) bytes[offset + i] = value.charCodeAt(i); };
  ascii(0, 'RIFF'); view.setUint32(4, 36 + length * 2, true); ascii(8, 'WAVE'); ascii(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); ascii(36, 'data'); view.setUint32(40, length * 2, true);
  for (let i = 0; i < length; i++) {
    const time = i / rate;
    const freq = cue === 'tick' ? 900 : cue === 'trap' ? 340 - time * 500 : cue === 'test' ? (time < 0.2 ? 650 : 880) : (time < 0.14 ? 650 : time < 0.28 ? 520 : 400);
    const envelope = Math.min(1, time / 0.008) * Math.max(0, 1 - time / duration);
    view.setInt16(44 + i * 2, Math.sin(2 * Math.PI * freq * time) * envelope * 9000, true);
  }
  return bytes;
}
type CompatibleFileSystem = {
  File?: new (uri: string) => { exists: boolean; create: () => void; write: (data: Uint8Array) => void };
  Paths?: { cache?: { uri: string } };
  cacheDirectory?: string | null;
  writeAsStringAsync?: (uri: string, contents: string, options: { encoding: string }) => Promise<void>;
};
async function sourceFor(cue: Cue): Promise<string> {
  const data = wave(cue);
  if (Platform.OS === 'web') return `data:audio/wav;base64,${base64(data)}`;
  // Use the new File API when available, otherwise the SDK 53 main-entry API.
  // Avoid importing a legacy subpath that older Expo SDKs cannot resolve.
  const files = await import('expo-file-system') as unknown as CompatibleFileSystem;
  const cache = files.Paths?.cache?.uri ?? files.cacheDirectory;
  if (!cache) throw new Error('Audio cache unavailable');
  const uri = `${cache.endsWith('/') ? cache : `${cache}/`}tisaa-${cue}-v1.wav`;
  if (files.File && files.Paths?.cache) {
    const file = new files.File(uri);
    if (!file.exists) file.create();
    file.write(data);
  } else {
    if (!files.writeAsStringAsync) throw new Error('Audio file writer unavailable');
    await files.writeAsStringAsync(uri, base64(data), { encoding: 'base64' });
  }
  return uri;
}
export function createCuePlayer() {
  let disposed = false;
  const sounds = new Map<Cue, Audio.Sound>();
  const loading = new Map<Cue, Promise<Audio.Sound | null>>();
  const load = (cue: Cue): Promise<Audio.Sound | null> => {
    if (disposed) return Promise.resolve(null);
    if (sounds.has(cue)) return Promise.resolve(sounds.get(cue)!);
    if (!loading.has(cue)) loading.set(cue, (async () => {
      const uri = await sourceFor(cue);
      const { sound } = await Audio.Sound.createAsync({ uri }, { volume: 0.6, shouldPlay: false });
      if (disposed) { await sound.unloadAsync(); return null; }
      sounds.set(cue, sound);
      return sound;
    })().catch(() => { loading.delete(cue); return null; }));
    return loading.get(cue)!;
  };
  return {
    prime: async () => { await Audio.setAudioModeAsync({ playsInSilentModeIOS: false, shouldDuckAndroid: true }).catch(() => undefined); await Promise.all((['tick', 'end', 'trap'] as Cue[]).map(load)); },
    play: async (cue: Cue) => { const sound = await load(cue); if (sound && !disposed) await sound.replayAsync().catch(() => undefined); },
    stop: () => { for (const sound of sounds.values()) void sound.stopAsync().catch(() => undefined); },
    dispose: () => { disposed = true; for (const sound of sounds.values()) void sound.unloadAsync().catch(() => undefined); sounds.clear(); },
  };
}
export async function vibrate(cue: Cue): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    if (cue === 'trap') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    else if (cue === 'end') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    else await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch { /* Unsupported devices remain playable. */ }
}
