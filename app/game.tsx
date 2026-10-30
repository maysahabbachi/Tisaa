import { useCallback, useEffect } from 'react';
import { BackHandler, FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { useGame } from '@/hooks/useGame';
import { useLayout } from '@/hooks/useLayout';
import { useSettings } from '@/hooks/useSettings';
import { useGameEffects } from '@/hooks/useGameEffects';
import { Screen } from '@/components/layout/Screen';
import { Button, IconButton, Label } from '@/components/ui/Primitives';
import { AnswerGrid } from '@/components/feature/AnswerGrid';
import { Timer } from '@/components/feature/Timer';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
const jokers = [{ id: 'double' as const, title: 'double' as const, icon: 'zap' as const }, { id: 'time' as const, title: 'extraTime' as const, icon: 'clock' as const }, { id: 'skip' as const, title: 'skip' as const, icon: 'shuffle' as const }];
export function GameScreen() {
  const game = useGame();
  const { wide } = useLayout();
  const { t, tr, number, rtl, sound, updateSettings } = useSettings();
  const effects = useGameEffects(game);
  const router = useRouter();
  const { showAlert } = useAlert();
  const exit = useCallback(() => showAlert(t('exitTitle'), t('exitMessage'), [{ text: t('continue'), style: 'cancel' }, { text: t('exit'), style: 'destructive', onPress: () => { game.abandonGame(); router.replace('/(tabs)'); } }]), [showAlert, t, game.abandonGame, router]);
  useEffect(() => { if (game.phase === 'done') router.replace('/results'); }, [game.phase, router]);
  useEffect(() => { const sub = BackHandler.addEventListener('hardwareBackPress', () => { exit(); return true; }); return () => sub.remove(); }, [exit]);
  const current = game.teams[game.turn % Math.max(1, game.teams.length)];
  const reader = game.teams[(game.turn + 1) % Math.max(1, game.teams.length)];
  const question = game.deck[game.turn];
  const joker = useCallback((kind: 'double' | 'time' | 'skip') => {
    if (kind === 'skip') showAlert(t('swapTitle'), t('swapMessage'), [{ text: t('cancel'), style: 'cancel' }, { text: t('skip'), onPress: () => game.useJoker(kind) }]);
    else game.useJoker(kind);
  }, [showAlert, t, game.useJoker]);
  if (!current || !reader || !question || game.teams.length !== 2) return <Screen><Label>{t('noGame')}</Label><Button title={t('backHome')} onPress={() => router.replace('/(tabs)')} /></Screen>;
  const playing = game.phase === 'playing';
  const review = game.phase === 'review';
  const round = Math.floor(game.turn / 2) + 1;
  const rounds = game.turns / 2;
  return <Screen scroll={false}>
    <View style={styles.header}><IconButton icon="x" label={t('endMatch')} onPress={exit} /><View style={styles.flex}><Label style={styles.round}>{tr(`الجولة ${number(round)} من ${number(rounds)}`,`Round ${number(round)} of ${number(rounds)}`,`Manche ${number(round)} sur ${number(rounds)}`)}</Label><Label subtle style={styles.caption}>{t(game.mode)} · {current.name}</Label></View><IconButton icon={sound ? 'volume-2' : 'volume-x'} label={t('sound')} onPress={() => updateSettings({ sound: !sound })} /></View>
    <View style={styles.progress}><View style={[styles.progressFill, { width: `${Math.max(1, ((game.turn + 1) / Math.max(1, game.turns)) * 100)}%` }]} /></View>
    <View style={styles.scores}><View style={styles.scoreTeam}><Label subtle style={styles.caption}>{game.teams[0].name}</Label><Label style={[styles.score, { color: colors.primary }]}>{number(game.teams[0].score + (game.turn % 2 === 0 ? game.roundScore : 0))}</Label></View><Label subtle style={styles.vs}>{t('vs')}</Label><View style={styles.scoreTeam}><Label subtle style={styles.caption}>{game.teams[1].name}</Label><Label style={[styles.score, { color: colors.success }]}>{number(game.teams[1].score + (game.turn % 2 === 1 ? game.roundScore : 0))}</Label></View></View>
    {game.phase === 'ready' ? <>
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false} contentContainerStyle={styles.readyScroll}><View style={styles.handoff}><View style={styles.handoffIcon}><Feather name="smartphone" size={42} color={colors.primary} /></View><Label style={styles.handoffTitle}>{tr(`الهاتف مع\n${reader.name}`,`Pass the phone to\n${reader.name}`,`Le téléphone pour\n${reader.name}`)}</Label><Label subtle style={styles.center}>{tr(`أنتم تقرؤون السؤال وتسجلون الإجابات.\n${current.name} يجيب بصوت عالٍ.`,`Read the question and tap the answers.\n${current.name} answers out loud.`,`Lisez la question et validez les réponses.\n${current.name} répond à voix haute.`)}</Label><View style={styles.secret}><Feather name="eye-off" size={18} color={colors.gold} /><Label style={styles.secretText}>{t('secret')}</Label></View></View><View style={styles.readyInfo}><Label style={styles.center}>{t('readyDetails')}</Label><Label subtle style={[styles.center, styles.caption]}>{t('revealHint')}</Label></View></ScrollView>
      <Button title={t('reveal')} icon="play" onPress={() => { effects.prime(); game.beginTurn(); }} />
    </> : <>
      <View style={styles.question}><Timer seconds={game.seconds} active={playing} /><View style={styles.questionCopy}><Label style={styles.category}>{question.category}</Label><Label style={styles.questionText}>{question.prompt}</Label><Label subtle style={styles.caption}>{t(review ? 'turnEnded' : 'tapHint')} · {number(game.selected.length)} / {number(9)}</Label></View></View>
      <ScrollView style={styles.flex} contentContainerStyle={styles.playContent} showsVerticalScrollIndicator={false}>
        {review ? <View accessibilityLiveRegion="polite" style={[styles.review, { backgroundColor: game.roundScore < 0 ? colors.dangerDark : colors.successDark }]}><Label style={styles.reviewTitle}>{t(game.seconds === 0 ? 'timeUp' : 'turnComplete')}</Label><Label style={[styles.reviewNumber, { color: game.roundScore < 0 ? colors.danger : colors.success }]}>{game.roundScore > 0 ? '+' : ''}{number(game.roundScore)} <Label>{t('points')}</Label></Label><Label subtle style={styles.center}>{tr(`تُضاف إلى رصيد ${current.name} عند المتابعة.`,`Added to ${current.name} when you continue.`,`Ajoutés à ${current.name} en continuant.`)}</Label></View> : <View style={styles.roundInfo}><Label style={styles.roundCaption}>{game.doubled ? `${t('doubled')} · ` : ''}{game.mode === 'streak' ? `${t('streak')} ×${number(Math.max(1, Math.min(3, game.streak)))}` : t('readerPoints')}</Label><Label style={styles.roundPoints}>{game.roundScore > 0 ? '+' : ''}{number(game.roundScore)} {t('points')}</Label></View>}
        <AnswerGrid answers={question.answers} selected={game.selected} disabled={!playing} onSelect={game.selectAnswer} wide={wide} />
        {playing ? <View style={styles.jokerWrap}><Label subtle style={styles.jokerLabel}>{tr(`جوكرات ${current.name} · مرة واحدة لكل مباراة`,`${current.name}’s jokers · Once per match`,`Jokers de ${current.name} · Une fois par partie`)}</Label><FlatList horizontal data={jokers} showsHorizontalScrollIndicator={false} keyExtractor={item => item.id} contentContainerStyle={[styles.jokers, { flexDirection: rtl ? 'row-reverse' : 'row' }]} renderItem={({ item }) => <Pressable accessibilityRole="button" accessibilityLabel={t(item.title)} accessibilityState={{ disabled: !current.jokers[item.id] }} disabled={!current.jokers[item.id]} onPress={() => joker(item.id)} style={({ pressed }) => [styles.joker, !current.jokers[item.id] ? styles.used : null, pressed ? styles.pressed : null]}><Feather name={current.jokers[item.id] ? item.icon : 'check'} color={current.jokers[item.id] ? colors.gold : colors.subtle} size={20} /><Label style={styles.jokerText}>{t(current.jokers[item.id] ? item.title : 'used')}</Label></Pressable>} /></View> : null}
      </ScrollView>
      <Button secondary={!review} title={review ? (game.turn + 1 >= game.turns ? t('finalResult') : tr(`الدور التالي · ${reader.name}`,`Next turn · ${reader.name}`,`Tour suivant · ${reader.name}`)) : t('endTurn')} icon={review ? (rtl ? 'arrow-left' : 'arrow-right') : 'square'} onPress={review ? game.nextTurn : game.endTurn} />
    </>}
  </Screen>;
}
export default GameScreen;
const styles = StyleSheet.create({ flex: { flex: 1 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm }, round: { fontSize: typography.section, fontWeight: '700' }, caption: { fontSize: typography.small, lineHeight: 22 }, progress: { height: 4, backgroundColor: colors.raised, borderRadius: 2, overflow: 'hidden', marginTop: -spacing.xs, marginBottom: -spacing.xs, alignItems: 'flex-end' }, progressFill: { height: 4, backgroundColor: colors.primary, borderRadius: 2 }, scores: { flexDirection: 'row-reverse', backgroundColor: colors.surface, borderRadius: radii.sm, paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, alignItems: 'center', gap: spacing.sm }, scoreTeam: { flex: 1, alignItems: 'center' }, score: { fontSize: 26, lineHeight: 34, fontWeight: '700' }, vs: { fontSize: typography.small }, readyScroll: { flexGrow: 1, justifyContent: 'center', gap: spacing.md }, handoff: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.md, gap: spacing.sm, borderWidth: 1, borderColor: colors.border }, handoffIcon: { width: 88, height: 88, backgroundColor: colors.primaryDark, borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-8deg' }] }, handoffTitle: { color: colors.cream, fontSize: typography.title, lineHeight: 40, fontWeight: '700', textAlign: 'center' }, center: { textAlign: 'center' }, secret: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.goldDark, padding: spacing.sm, borderRadius: radii.sm, alignSelf: 'stretch' }, secretText: { flex: 1, color: colors.gold, fontSize: typography.small, lineHeight: 22 }, readyInfo: { gap: spacing.xs }, question: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, questionCopy: { flex: 1, gap: spacing.xs }, category: { color: colors.primary, fontSize: typography.label, fontWeight: '600' }, questionText: { fontSize: typography.section, lineHeight: 30, fontWeight: '700', color: colors.cream }, playContent: { gap: spacing.sm, paddingBottom: spacing.sm }, roundInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: spacing.xs }, roundCaption: { color: colors.gold, fontSize: typography.label, flexShrink: 1 }, roundPoints: { color: colors.primary, fontWeight: '700' }, review: { padding: spacing.sm, borderRadius: radii.md, alignItems: 'center', gap: spacing.xs }, reviewTitle: { fontWeight: '700', fontSize: typography.section }, reviewNumber: { fontWeight: '700', fontSize: 36, lineHeight: 46 }, jokerWrap: { minHeight: 112 }, jokerLabel: { fontSize: typography.small, marginBottom: spacing.xs }, jokers: { gap: spacing.xs, flexGrow: 1 }, joker: { flexGrow: 1, minHeight: 72, borderRadius: radii.sm, backgroundColor: colors.goldDark, alignItems: 'center', justifyContent: 'center', gap: spacing.xs, minWidth: 90, paddingHorizontal: spacing.xs }, jokerText: { fontSize: typography.small, color: colors.gold }, used: { backgroundColor: colors.surface, opacity: 0.5 }, pressed: { opacity: 0.7 } });
