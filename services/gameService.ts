import AsyncStorage from '@react-native-async-storage/async-storage';

export type Answer = { text: string; points: number };
export type Question = { id: string; category: string; prompt: string; answers: Answer[]; pack: string };
export type GameMode = 'classic' | 'streak';
export type Team = { name: string; score: number; jokers: { double: boolean; time: boolean; skip: boolean } };
export type LastGame = { teams: { name: string; score: number }[]; date: string };
export const packs = [
  { id: 'general', name: 'لمة ومعرفة', subtitle: 'من كل موضوع حكاية', count: 12, icon: 'grid' as const, price: 'مجاني', color: 'primary' as const },
  { id: 'football', name: 'عالم كرة القدم', subtitle: 'لأصحاب النقاشات الكروية', count: 4, icon: 'dribbble' as const, price: 'فتح تجريبي', color: 'success' as const },
  { id: 'games', name: 'عالم الألعاب', subtitle: 'من الكلاسيكيات إلى المفضلة', count: 4, icon: 'cpu' as const, price: 'فتح تجريبي', color: 'gold' as const },
];
const make = (id: string, category: string, prompt: string, names: string[], pack = 'general'): Question => ({
  id, category, prompt, pack, answers: names.map((text, index) => ({ text, points: [1, 2, 1, -2, 2, 1, 3, 2, -3][index] })),
});
export const questions: Question[] = [
  make('g1', 'جغرافيا', 'اذكر دولة تقع في إفريقيا', ['مصر', 'المغرب', 'الجزائر', 'كينيا', 'تونس', 'السودان', 'غانا', 'نيجيريا', 'السنغال']),
  make('g2', 'على السفرة', 'اذكر شيئًا قد تجده في وجبة فطور', ['البيض', 'الخبز', 'الجبن', 'الزيتون', 'الفول', 'الحليب', 'العسل', 'اللبنة', 'المربى']),
  make('g3', 'عالم الحيوان', 'اذكر حيوانًا يعيش في البرية', ['الأسد', 'الفيل', 'الزرافة', 'الذئب', 'النمر', 'الدب', 'الغزال', 'الثعلب', 'وحيد القرن']),
  make('g4', 'في البيت', 'اذكر شيئًا موجودًا في المطبخ', ['الثلاجة', 'الفرن', 'الملعقة', 'السكين', 'القدر', 'الكوب', 'المصفاة', 'الصحن', 'الخلاط']),
  make('g5', 'جغرافيا', 'اذكر عاصمة عربية', ['القاهرة', 'الرياض', 'الرباط', 'بيروت', 'تونس', 'عمّان', 'مسقط', 'الدوحة', 'بغداد']),
  make('g6', 'وقت اللعب', 'اذكر رياضة تُلعب باستخدام كرة', ['كرة القدم', 'كرة السلة', 'التنس', 'الجولف', 'كرة اليد', 'الكرة الطائرة', 'الرجبي', 'البيسبول', 'تنس الطاولة']),
  make('g7', 'ألوان ونكهات', 'اذكر نوعًا من الفاكهة', ['التفاح', 'الموز', 'البرتقال', 'الكيوي', 'العنب', 'المانجو', 'الرمان', 'الفراولة', 'الأناناس']),
  make('g8', 'في الطريق', 'اذكر وسيلة نقل', ['السيارة', 'الحافلة', 'القطار', 'الدراجة', 'الطائرة', 'السفينة', 'الترام', 'الدراجة النارية', 'المروحية']),
  make('g9', 'مهن وحكايات', 'اذكر مهنة يعمل بها الناس', ['الطبيب', 'المعلم', 'المهندس', 'الطيار', 'الطاهي', 'الممرض', 'المحامي', 'المحاسب', 'المزارع']),
  make('g10', 'أصوات', 'اذكر آلة موسيقية', ['العود', 'البيانو', 'الجيتار', 'الكمان', 'الناي', 'الطبل', 'القانون', 'الساكسفون', 'التشيلو']),
  make('g11', 'جغرافيا', 'اذكر دولة تقع في أوروبا', ['فرنسا', 'إسبانيا', 'إيطاليا', 'ألمانيا', 'البرتغال', 'اليونان', 'النرويج', 'السويد', 'بولندا']),
  make('g12', 'شنطة السفر', 'اذكر شيئًا تأخذه معك في السفر', ['جواز السفر', 'الملابس', 'الشاحن', 'الكتاب', 'الهاتف', 'فرشاة الأسنان', 'سماعات الأذن', 'حذاء', 'كاميرا']),
  make('f1', 'كرة القدم', 'اذكر ناديًا فاز بدوري أبطال أوروبا أو كأس أوروبا', ['ريال مدريد', 'برشلونة', 'ميلان', 'إنتر ميلان', 'بايرن ميونخ', 'ليفربول', 'أياكس', 'مانشستر يونايتد', 'بورتو'], 'football'),
  make('f2', 'كرة القدم', 'اذكر ناديًا يلعب في الدوري الإنجليزي الممتاز موسم ٢٠٢٥–٢٠٢٦', ['أرسنال', 'ليفربول', 'تشيلسي', 'إيفرتون', 'مانشستر سيتي', 'مانشستر يونايتد', 'نيوكاسل', 'أستون فيلا', 'توتنهام'], 'football'),
  make('f3', 'كرة القدم', 'اذكر منتخبًا عربيًا شارك في كأس العالم للرجال قبل ٢٠٢٦', ['مصر', 'المغرب', 'تونس', 'الكويت', 'الجزائر', 'السعودية', 'العراق', 'قطر', 'الإمارات'], 'football'),
  make('f4', 'كرة القدم', 'اذكر لاعبًا فاز بالكرة الذهبية للرجال', ['ميسي', 'كريستيانو رونالدو', 'مودريتش', 'كاكا', 'بنزيما', 'رونالدينيو', 'رونالدو نازاريو', 'زيدان', 'رودري'], 'football'),
  make('v1', 'ألعاب الفيديو', 'اذكر لعبة فيديو لها طور متعدد اللاعبين', ['ماينكرافت', 'فورتنايت', 'فيفا', 'أمونغ أس', 'كول أوف ديوتي', 'روكيت ليج', 'فالورانت', 'ببجي', 'ماريو كارت'], 'games'),
  make('v2', 'ألعاب الفيديو', 'اذكر شخصية من عالم سوبر ماريو', ['ماريو', 'لويجي', 'بيتش', 'باوزر', 'يوشي', 'تود', 'واريو', 'والويجي', 'دونكي كونغ'], 'games'),
  make('v3', 'ألعاب الفيديو', 'اذكر جهاز ألعاب منزليًا أو محمولًا', ['بلايستيشن ٥', 'إكس بوكس سيريس إكس', 'نينتندو سويتش', 'جيم بوي', 'بلايستيشن ٤', 'نينتندو وي', 'سيجا ميجا درايف', 'بلايستيشن ٢', 'ستيم ديك'], 'games'),
  make('v4', 'ألعاب الفيديو', 'اذكر سلسلة ألعاب سباق سيارات', ['فورزا', 'جران توريزمو', 'نيد فور سبيد', 'برن آوت', 'ماريو كارت', 'ذا كرو', 'ديرت', 'إف ١', 'تراك مانيا'], 'games'),
];
export function getDeck(pack: string): Question[] {
  const pool = questions.filter(q => q.pack === pack);
  const deck = [...pool];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
export function createTeams(names: string[]): Team[] {
  return names.map(name => ({ name: name.trim(), score: 0, jokers: { double: true, time: true, skip: true } }));
}
export async function loadLocal(): Promise<{ unlocked: string[]; lastGame: LastGame | null }> {
  try {
    const saved = await AsyncStorage.getItem('tisaa-state');
    return saved ? JSON.parse(saved) : { unlocked: ['general'], lastGame: null };
  } catch { return { unlocked: ['general'], lastGame: null }; }
}
export async function saveLocal(unlocked: string[], lastGame: LastGame | null): Promise<void> {
  try { await AsyncStorage.setItem('tisaa-state', JSON.stringify({ unlocked, lastGame })); } catch { /* Session remains playable without storage. */ }
}
