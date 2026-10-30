import AsyncStorage from '@react-native-async-storage/async-storage';
import { topicSets } from './content';
import { text, type Language } from './content/types';
export type Answer = { text: string; points: number };
export type Question = { id: string; category: string; prompt: string; answers: Answer[]; pack: string };
export type GameMode = 'classic' | 'streak';
export type Team = { name: string; score: number; jokers: { double: boolean; time: boolean; skip: boolean } };
export type LastGame = { teams: { name: string; score: number }[]; date: string };
const packDefinitions = [
  { id: 'general', title: text('لمة ومعرفة','Everyday life','Vie quotidienne'), subtitle: text('البيت والعمل وتفاصيل يومكم','Home, work and everyday moments','Maison, travail et vie de tous les jours'), icon: 'grid' as const, color: 'primary' as const },
  { id: 'geography', title: text('حول العالم','Around the world','Autour du monde'), subtitle: text('بلدان وعواصم وطبيعة الأرض','Countries, capitals and landscapes','Pays, capitales et paysages'), icon: 'globe' as const, color: 'success' as const },
  { id: 'nature', title: text('عالم الطبيعة','Wild & natural','Nature sauvage'), subtitle: text('حيوانات ونباتات وعجائب الطبيعة','Animals, plants and natural wonders','Animaux, plantes et merveilles'), icon: 'feather' as const, color: 'success' as const },
  { id: 'food', title: text('على السفرة','At the table','À table'), subtitle: text('أطباق ونكهات من كل مكان','Dishes and flavors from everywhere','Plats et saveurs du monde'), icon: 'coffee' as const, color: 'gold' as const },
  { id: 'football', title: text('عالم كرة القدم','Football fans','Passion football'), subtitle: text('أندية ونجوم وبطولات','Clubs, stars and competitions','Clubs, stars et compétitions'), icon: 'dribbble' as const, color: 'success' as const },
  { id: 'games', title: text('وقت اللعب','Game on','À vous de jouer'), subtitle: text('ألعاب فيديو وألعاب الطاولة','Video games and board games','Jeux vidéo et jeux de société'), icon: 'cpu' as const, color: 'gold' as const },
  { id: 'science', title: text('علوم وتقنية','Science & tech','Sciences et technologie'), subtitle: text('الجسم والفضاء وعالم التقنية','The body, space and technology','Corps, espace et technologie'), icon: 'zap' as const, color: 'primary' as const },
  { id: 'culture', title: text('فن وثقافة','Arts & culture','Arts et culture'), subtitle: text('كتب وموسيقى وسينما','Books, music and cinema','Livres, musique et cinéma'), icon: 'book-open' as const, color: 'gold' as const },
  { id: 'sports', title: text('روح الرياضة','Sporting spirit','Esprit sportif'), subtitle: text('رياضات وأبطال وتحديات','Sports, champions and challenges','Sports, champions et défis'), icon: 'activity' as const, color: 'primary' as const },
  { id: 'travel', title: text('شنطة السفر','Let’s travel','Partons en voyage'), subtitle: text('رحلات ووجهات ومغامرات','Trips, destinations and adventures','Voyages, destinations et aventures'), icon: 'compass' as const, color: 'success' as const },
];
export function getPacks(language: Language = 'ar') {
  return packDefinitions.map(p => ({ id: p.id, name: p.title[language], subtitle: p.subtitle[language], count: topicSets[p.id].topics.length, icon: p.icon, color: p.color, price: p.id === 'general' ? text('مجاني','Free','Gratuit')[language] : text('شراء مرة واحدة','One-time purchase','Achat unique')[language] }));
}
export type Pack = ReturnType<typeof getPacks>[number];
export const packs = getPacks();
function pointPattern(seed: number): number[] {
  const values = [1, 2, 1, -2, 2, 1, 3, 2, -3];
  let state = seed + 11;
  for (let i = values.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}
export function getQuestions(language: Language = 'ar'): Question[] {
  return packDefinitions.flatMap((p, packIndex) => topicSets[p.id].topics.map((q, i) => {
    const points = pointPattern(packIndex * 30 + i);
    return { id: `${p.id}-${i + 1}`, category: p.title[language], prompt: q.title[language], pack: p.id, answers: q.keys.map((key, index) => ({ text: topicSets[p.id].words[key][language], points: points[index] })) };
  }));
}
export const questions = getQuestions();
export function getDeck(pack: string, language: Language = 'ar'): Question[] {
  const deck = getQuestions(language).filter(q => q.pack === pack);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
export function createTeams(names: string[]): Team[] { return names.map(name => ({ name: name.trim(), score: 0, jokers: { double: true, time: true, skip: true } })); }
export async function loadLocal(): Promise<{ lastGame: LastGame | null }> {
  try {
    const raw = await AsyncStorage.getItem('tisaa-state');
    const data = raw ? JSON.parse(raw) : {};
    const lastGame = data.lastGame;
    return { lastGame: lastGame && Array.isArray(lastGame.teams) && lastGame.teams.length === 2 && lastGame.teams.every((t: { name?: unknown; score?: unknown }) => typeof t.name === 'string' && typeof t.score === 'number') ? lastGame : null };
  } catch { return { lastGame: null }; }
}
export async function saveLocal(lastGame: LastGame | null): Promise<void> { try { await AsyncStorage.setItem('tisaa-state', JSON.stringify({ lastGame })); } catch { /* In-memory play remains available. */ } }
