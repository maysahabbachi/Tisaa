export type Language = 'ar' | 'en' | 'fr';
export type Localized = { ar: string; en: string; fr: string };
export type Topic = { title: Localized; keys: string[] };
export type TopicSet = { words: Record<string, Localized>; topics: Topic[] };
export function text(ar: string, en: string, fr: string): Localized { return { ar, en, fr }; }
export function wordBank(rows: string): Record<string, Localized> {
  return Object.fromEntries(rows.trim().split('\n').filter(Boolean).map(row => {
    const [id, ar, en, fr] = row.split('|');
    if (!id || !ar || !en || !fr) throw new Error(`Invalid word: ${row}`);
    return [id, text(ar, en, fr)];
  }));
}
export function topic(ar: string, en: string, fr: string, keys: string): Topic {
  return { title: text(ar, en, fr), keys: keys.split(' ') };
}
