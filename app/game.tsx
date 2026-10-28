import { useEffect } from 'react';
import { BackHandler, FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { useGame } from '@/hooks/useGame';
import { useLayout } from '@/hooks/useLayout';
import { Screen } from '@/components/layout/Screen';
import { Button, IconButton, Label } from '@/components/ui/Primitives';
import { AnswerGrid } from '@/components/feature/AnswerGrid';
import { Timer } from '@/components/feature/Timer';
import { colors, radii, spacing, type as typography } from '@/constants/theme';

const jokers = [{ id: 'double' as const, title: 'مضاعفة', icon: 'zap' as const }, { id: 'time' as const, title: '+١٥ ثانية', icon: 'clock' as const }, { id: 'skip' as const, title: 'تبديل', icon: 'shuffle' as const }];
export function GameScreen() {
  const game = useGame();
  const { wide } = useLayout();
  const router = useRouter();
  const { showAlert } = useAlert();
  const exit = () => showAlert('الخروج من التحدي؟', 'ستفقدون تقدم المباراة الحالية. آخر نتيجة مكتملة تبقى محفوظة.', [{ text: 'نكمل اللعب', style: 'cancel' }, { text: 'خروج', style: 'destructive', onPress: () => { game.abandonGame(); router.replace('/(tabs)'); } }]);
  useEffect(() => { if (game.phase === 'done') router.replace('/results'); }, [game.phase, router]);
  useEffect(() => { const sub = BackHandler.addEventListener('hardwareBackPress', () => { exit(); return true; }); return () => sub.remove(); });
  const current = game.teams[game.turn % Math.max(1, game.teams.length)];
  const reader = game.teams[(game.turn + 1) % Math.max(1, game.teams.length)];
  const question = game.deck[game.turn % Math.max(1, game.deck.length)];
  if (!current || !question) return <Screen><Label>ابدأوا مباراة جديدة للعب.</Label><Button title="العودة للّمة" onPress={() => router.replace('/(tabs)')} /></Screen>;
  const playing = game.phase === 'playing';
  const review = game.phase === 'review';
  const useJoker = (kind: 'double' | 'time' | 'skip') => {
    if (kind === 'skip') showAlert('تبديل السؤال؟', 'ستُحذف نقاط هذا الدور وإجاباته، ويبدأ سؤال آخر بدقيقة جديدة. يُستهلك جوكر التبديل.', [{ text: 'إلغاء', style: 'cancel' }, { text: 'تبديل السؤال', onPress: () => game.useJoker(kind) }]);
    else game.useJoker(kind);
  };
  return <Screen scroll={false}>
    <View style={styles.header}><IconButton icon="x" label="إنهاء المباراة" onPress={exit} /><View><Label style={styles.round}>الجولة {Math.floor(game.turn / 2 + 1).toLocaleString('ar')} من {(game.turns / 2).toLocaleString('ar')}</Label><Label subtle style={styles.caption}>{game.mode === 'classic' ? 'التحدي الكلاسيكي' : 'تحدي السلسلة'} · {current.name}</Label></View></View>
    <View style={styles.progress}><View style={[styles.progressFill, { width: `${Math.max(1, ((game.turn + 1) / game.turns) * 100)}%` }]} /></View>
    <View style={styles.scores}><View style={styles.scoreTeam}><Label subtle numberOfLines={undefined as never} style={styles.caption}>{game.teams[0].name}</Label><Label style={[styles.score, { color: colors.primary }]}>{(game.teams[0].score + (game.turn % 2 === 0 ? game.roundScore : 0)).toLocaleString('ar')}</Label></View><Label subtle style={styles.vs}>ضد</Label><View style={styles.scoreTeam}><Label subtle style={styles.caption}>{game.teams[1].name}</Label><Label style={[styles.score, { color: colors.success }]}>{(game.teams[1].score + (game.turn % 2 === 1 ? game.roundScore : 0)).toLocaleString('ar')}</Label></View></View>
    {game.phase === 'ready' ? <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.readyScroll}><View style={styles.handoff}><View style={styles.handoffIcon}><Feather name="smartphone" size={42} color={colors.primary} /></View><Label style={styles.handoffTitle}>الهاتف مع{ '\n' }{reader?.name}</Label><Label subtle style={styles.center}>أنتم تقرؤون السؤال وتضغطون الإجابات.{ '\n' }{current.name} يجيب بصوت عالٍ.</Label><View style={styles.secret}><Feather name="eye-off" size={18} color={colors.gold} /><Label style={styles.secretText}>لا تكشفوا الشاشة أو نقاط الأجوبة للفريق!</Label></View></View><View style={styles.readyInfo}><Label style={styles.center}>٩ إجابات · ٦٠ ثانية · ٣ جوكرات</Label><Label subtle style={[styles.center, styles.caption]}>يظهر السؤال عند الضغط على ابدأ.</Label></View></ScrollView>
      <Button title="ابدأ المؤقت واكشف السؤال" icon="play" onPress={game.beginTurn} />
    </> : <>
      <View style={styles.question}><Timer seconds={game.seconds} active={playing} /><View style={styles.questionCopy}><Label style={styles.category}>{question.category}</Label><Label style={styles.questionText}>{question.prompt}</Label><Label subtle style={styles.caption}>{review ? 'انتهى الدور' : 'اضغط ما يقوله الفريق فقط'} · {game.selected.length.toLocaleString('ar')} / ٩</Label></View></View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.playContent} showsVerticalScrollIndicator={false}>
        {review ? <View style={[styles.review, { backgroundColor: game.roundScore < 0 ? colors.dangerDark : colors.successDark }]}><Label style={styles.reviewTitle}>{game.seconds === 0 ? 'انتهى الوقت!' : 'اكتمل الدور!'}</Label><Label style={[styles.reviewNumber, { color: game.roundScore < 0 ? colors.danger : colors.success }]}>{game.roundScore > 0 ? '+' : ''}{game.roundScore.toLocaleString('ar')} <Label>نقطة</Label></Label><Label subtle style={styles.center}>تُضاف إلى رصيد {current.name} عند المتابعة.</Label></View> : <View style={styles.roundInfo}><Label style={{ color: colors.gold, fontSize: typography.label }}>{game.doubled ? 'المضاعفة مفعلة · ' : ''}{game.mode === 'streak' ? `السلسلة ×${Math.max(1, Math.min(3, game.streak))}` : 'النقاط الموجبة والسالبة ظاهرة للقارئ'}</Label><Label style={{ color: colors.primary, fontWeight: '700' }}>{game.roundScore > 0 ? '+' : ''}{game.roundScore} نقطة</Label></View>}
        <AnswerGrid answers={question.answers} selected={game.selected} disabled={!playing} onSelect={game.selectAnswer} wide={wide} />
        {playing ? <View><Label subtle style={styles.jokerLabel}>جوكرات {current.name} · مرة واحدة لكل مباراة</Label><FlatList horizontal scrollEnabled={false} data={jokers} keyExtractor={item => item.id} contentContainerStyle={styles.jokers} renderItem={({ item }) => <Pressable accessibilityRole="button" accessibilityLabel={item.title} disabled={!current.jokers[item.id]} onPress={() => useJoker(item.id)} style={({ pressed }) => [styles.joker, !current.jokers[item.id] ? styles.used : null, pressed ? styles.pressed : null]}><Feather name={current.jokers[item.id] ? item.icon : 'check'} color={current.jokers[item.id] ? colors.gold : colors.subtle} size={20} /><Label style={styles.jokerText}>{current.jokers[item.id] ? item.title : 'استُخدم'}</Label></Pressable>} /></View> : null}
      </ScrollView>
      <Button secondary={!review} title={review ? (game.turn + 1 >= game.turns ? 'اعرضوا النتيجة النهائية' : `الدور التالي · ${reader?.name}`) : 'إنهاء الدور'} icon={review ? 'arrow-left' : 'square'} onPress={review ? game.nextTurn : game.endTurn} />
    </>}
  </Screen>;
}
export default GameScreen;
const styles = StyleSheet.create({ header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm }, round: { fontSize: typography.section, fontWeight: '700' }, caption: { fontSize: typography.small, lineHeight: 22 }, progress: { height: 4, backgroundColor: colors.raised, borderRadius: 2, overflow: 'hidden', marginTop: -12, marginBottom: -12, alignItems: 'flex-end' }, progressFill: { height: 4, backgroundColor: colors.primary, borderRadius: 2 }, scores: { flexDirection: 'row-reverse', backgroundColor: colors.surface, borderRadius: radii.sm, paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, alignItems: 'center', gap: spacing.sm }, scoreTeam: { flex: 1, alignItems: 'center' }, score: { fontSize: 26, lineHeight: 34, fontWeight: '700' }, vs: { fontSize: typography.small }, readyScroll: { flexGrow: 1, justifyContent: 'center', gap: spacing.md }, handoff: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.md, gap: spacing.sm, borderWidth: 1, borderColor: colors.border }, handoffIcon: { width: 88, height: 88, backgroundColor: colors.primaryDark, borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-8deg' }] }, handoffTitle: { color: colors.cream, fontSize: typography.title, lineHeight: 40, fontWeight: '700', textAlign: 'center' }, center: { textAlign: 'center' }, secret: { flexDirection: 'row-reverse', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.goldDark, padding: 12, borderRadius: radii.sm, alignSelf: 'stretch' }, secretText: { flex: 1, color: colors.gold, fontSize: typography.small, lineHeight: 22 }, readyInfo: { gap: spacing.xs }, question: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, questionCopy: { flex: 1, gap: 4 }, category: { color: colors.primary, fontSize: typography.label, fontWeight: '600' }, questionText: { fontSize: typography.section, lineHeight: 30, fontWeight: '700', color: colors.cream }, playContent: { gap: spacing.sm, paddingBottom: spacing.sm }, roundInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: spacing.xs }, review: { padding: spacing.sm, borderRadius: radii.md, alignItems: 'center', gap: spacing.xs }, reviewTitle: { fontWeight: '700', fontSize: typography.section }, reviewNumber: { fontWeight: '700', fontSize: 36, lineHeight: 46 }, jokerLabel: { fontSize: typography.small, marginBottom: spacing.xs }, jokers: { flexDirection: 'row-reverse', gap: spacing.xs, flexGrow: 1 }, joker: { flex: 1, minHeight: 64, borderRadius: radii.sm, backgroundColor: colors.goldDark, alignItems: 'center', justifyContent: 'center', gap: 4, minWidth: 80, paddingHorizontal: 8 }, jokerText: { fontSize: typography.small, color: colors.gold }, used: { backgroundColor: colors.surface, opacity: 0.5 }, pressed: { opacity: 0.7 } });
