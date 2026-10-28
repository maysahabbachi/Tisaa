import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
import { Screen } from '@/components/layout/Screen';
import { Button, IconButton, Label, SectionHeading } from '@/components/ui/Primitives';
import { HomeHero } from '@/components/feature/HomeHero';
import { PackCard } from '@/components/feature/PackCard';
import { PackPreview } from '@/components/feature/PackPreview';
import { useLayout } from '@/hooks/useLayout';
import { useGame } from '@/hooks/useGame';
import { usePackShop } from '@/hooks/usePackShop';
import { packs } from '@/services/gameService';

export function HomeScreen() {
  const router = useRouter();
  const { wide } = useLayout();
  const { lastGame, loaded } = useGame();
  const shop = usePackShop();
  const winner = lastGame ? [...lastGame.teams].sort((a, b) => b.score - a.score)[0] : null;
  const tied = lastGame ? lastGame.teams[0]?.score === lastGame.teams[1]?.score : false;
  return <Screen tabs>
    <View style={styles.header}><View style={styles.offline}><Feather name="wifi-off" size={14} color={colors.success} /><Label style={styles.offlineText}>بدون إنترنت</Label></View><View style={styles.brand}><View><Label style={styles.brandName}>تسعة!</Label><Label style={styles.brandSubtitle}>كل جواب يغيّر اللعبة</Label></View><View style={styles.brandMark}><Label style={styles.nine}>٩</Label></View></View></View>
    <View><Label style={styles.welcome}>جمّعوا أصحابكم.</Label><Label subtle>الهاتف واحد… والحماس للجميع.</Label></View>
    <HomeHero wide={wide} />
    <View style={styles.action}><Button title="ابدأوا التحدي" icon="arrow-left" disabled={!loaded} onPress={() => router.push('/setup')} /><Label subtle style={styles.actionHint}>فريقان · هاتف واحد · أسئلة عربية أصلية</Label></View>
    <View style={styles.how}><IconButton icon="arrow-up-left" label="تعرف على طريقة اللعب" onPress={() => router.push('/(tabs)/rules')} /><View style={styles.howText}><Label style={styles.howTitle}>اقرأ، اسمع، وسجّل!</Label><Label subtle style={styles.howBody}>الفريق المنافس يمسك الهاتف ويحدد إجاباتكم.</Label></View><View style={styles.howIcon}><Feather name="message-circle" size={25} color={colors.primary} /></View></View>
    <View><SectionHeading title="زودوا التحدي" hint="كل الحزم" onPress={() => router.push('/(tabs)/packs')} /><FlatList key={wide ? 'wide' : 'small'} data={packs.filter(p => p.id !== 'general')} numColumns={wide ? 2 : 1} scrollEnabled={false} contentContainerStyle={styles.packList} columnWrapperStyle={wide ? styles.packRow : undefined} keyExtractor={p => p.id} renderItem={({ item }) => <View style={{ flex: 1 }}><PackCard compact pack={item} unlocked={shop.unlocked.includes(item.id)} onPress={() => shop.openPack(item.id)} /></View>} /></View>
    {winner ? <View style={styles.last}><Feather name="award" color={colors.gold} size={24} /><View style={{ flex: 1 }}><Label style={styles.howTitle}>{tied ? 'آخر تحدي انتهى بالتعادل' : `آخر فوز: ${winner.name}`}</Label><Label subtle style={styles.howBody}>{winner.score.toLocaleString('ar')} نقطة · جاهزون لجولة جديدة؟</Label></View></View> : null}
    <Label subtle style={styles.footer}>صُنعت للّمة، لا للشاشة.</Label>
    <PackPreview id={shop.preview} onClose={shop.close} onUnlock={shop.unlock} />
  </Screen>;
}
export default HomeScreen;
const styles = StyleSheet.create({ header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs }, brandMark: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '7deg' }] }, nine: { color: colors.background, fontSize: 36, lineHeight: 46, fontWeight: '700', textAlign: 'center' }, brandName: { fontSize: typography.title, fontWeight: '700', color: colors.cream, lineHeight: 34 }, brandSubtitle: { fontSize: 11, color: colors.subtle, lineHeight: 18 }, offline: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: colors.successDark, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 }, offlineText: { fontSize: 11, color: colors.success }, welcome: { fontSize: typography.title, fontWeight: '700', lineHeight: 38 }, action: { gap: spacing.xs }, actionHint: { textAlign: 'center', fontSize: typography.small }, how: { backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.xs, borderWidth: 1, borderColor: colors.border }, howText: { flex: 1 }, howTitle: { fontWeight: '600', fontSize: typography.body }, howBody: { fontSize: typography.small, lineHeight: 22 }, howIcon: { width: 40, alignItems: 'center' }, packList: { gap: spacing.sm }, packRow: { gap: spacing.sm }, last: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.sm, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, backgroundColor: colors.goldDark }, footer: { textAlign: 'center', fontSize: typography.small } });
