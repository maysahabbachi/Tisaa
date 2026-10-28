import { FlatList, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button, Label } from '@/components/ui/Primitives';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
const rules = [
  { icon: 'users' as const, title: 'فريق يلعب، وفريق يقرأ', text: 'قسّموا المجموعة إلى فريقين. الفريق المنافس يمسك الهاتف ويقرأ السؤال بصوت عالٍ، من دون كشف الإجابات أو نقاطها.' },
  { icon: 'clock' as const, title: 'تسعة أجوبة في دقيقة', text: 'الفريق الذي يلعب يقول إجاباته، والقارئ يضغط الإجابات المطابقة فقط. لا تحتاجون إلى كتابة أو تسجيل صوت. أي إجابة غير موجودة لا تُحتسب.' },
  { icon: 'alert-circle' as const, title: 'الإجابة صحيحة… لكن خادعة!', text: 'كل الإجابات منطقية وتنتمي للسؤال. بعضها يعطي +١ أو +٢ أو +٣، وبعضها يخصم −٢ أو −٣. مثل كينيا في سؤال الدول الإفريقية: صحيحة، لكنها قد تخصم نقاطًا!' },
  { icon: 'zap' as const, title: 'ثلاثة جوكرات لكل فريق', text: 'المضاعفة: تضاعف النقاط الموجبة التالية فقط. الوقت: يضيف ١٥ ثانية. التبديل: يستبدل السؤال ويعيد الوقت والنقاط إلى البداية. كل جوكر يُستخدم مرة واحدة في المباراة.' },
  { icon: 'trending-up' as const, title: 'كلاسيكي أم سلسلة؟', text: 'الكلاسيكي يحتسب نقاط البطاقة. السلسلة تضاعف الإيجابيات المتتالية حتى ×٣؛ الإجابة السالبة تعيد السلسلة إلى الصفر. تختارون النمط قبل اللعب.' },
  { icon: 'award' as const, title: 'مرّروا الهاتف، واكسبوا اللّمة', text: 'بعد كل دور يُضاف المجموع لرصيد الفريق. يتبادل الفريقان الأدوار بالتساوي؛ صاحب المجموع الأعلى يفوز، حتى لو كانت النقاط سالبة. الحزم القصيرة لها جولتان لكل فريق.' },
  { icon: 'wifi-off' as const, title: 'اللعبة معكم أينما كنتم', text: 'الأسئلة مضمّنة وتعمل دون إنترنت بعد تحميل التطبيق. آخر نتيجة والحزم التجريبية محفوظة على الجهاز؛ المباراة الحالية تبدأ من جديد عند إغلاق التطبيق.' },
];
export function RulesScreen() {
  const router = useRouter();
  return <Screen tabs scroll={false}><View><Label style={styles.eyebrow}>دليل اللّمة</Label><Label style={styles.title}>سهلة تتعلّمها.{ '\n' }صعب تتوقعها.</Label></View><FlatList style={{ flex: 1 }} data={rules} keyExtractor={item => item.title} showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} renderItem={({ item, index }) => <View style={styles.card}><View style={styles.top}><Label style={styles.number}>{String(index + 1).padStart(2, '0')}</Label><View style={styles.icon}><Feather name={item.icon} size={22} color={colors.primary} /></View></View><Label style={styles.cardTitle}>{item.title}</Label><Label subtle style={styles.body}>{item.text}</Label></View>} ListFooterComponent={<View style={styles.footer}><Button title="فهمناها، خلّونا نلعب" icon="arrow-left" onPress={() => router.push('/setup')} /></View>} /></Screen>;
}
export default RulesScreen;
const styles = StyleSheet.create({ eyebrow: { color: colors.primary, fontSize: typography.label }, title: { fontSize: 32, color: colors.cream, fontWeight: '700', lineHeight: 44 }, list: { gap: spacing.sm, paddingBottom: spacing.sm }, card: { backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.xs }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, number: { fontSize: typography.title, color: colors.subtle, fontWeight: '600' }, icon: { width: 44, height: 44, backgroundColor: colors.primaryDark, borderRadius: radii.sm, alignItems: 'center', justifyContent: 'center' }, cardTitle: { fontSize: typography.section, fontWeight: '700' }, body: { lineHeight: 28 }, footer: { paddingTop: spacing.sm } });
