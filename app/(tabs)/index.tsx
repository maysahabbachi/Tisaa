import { useMemo } from 'react';
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
import { useSettings } from '@/hooks/useSettings';
import { getPacks } from '@/services/gameService';
export function HomeScreen() {
  const router = useRouter();
  const { wide } = useLayout();
  const { lastGame, loaded } = useGame();
  const shop = usePackShop();
  const { t, tr, number, language, rtl } = useSettings();
  const featured = useMemo(() => getPacks(language).filter(p => ['football','games'].includes(p.id)), [language]);
  const winner = lastGame ? [...lastGame.teams].sort((a, b) => b.score - a.score)[0] : null;
  const tied = lastGame ? lastGame.teams[0]?.score === lastGame.teams[1]?.score : false;
  return <Screen tabs scroll={false}><FlatList style={styles.flex} key={wide ? 'wide' : 'phone'} data={featured} numColumns={wide ? 2 : 1} showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} columnWrapperStyle={wide ? styles.row : undefined} keyExtractor={p => p.id} renderItem={({ item }) => <View style={styles.flex}><PackCard compact pack={item} unlocked={shop.unlocked.includes(item.id)} price={shop.products.find(p => p.id === item.id)?.price} onPress={() => shop.openPack(item.id)} /></View>}
    ListHeaderComponent={<View style={styles.blocks}>
      <View style={[styles.header, { flexDirection: rtl ? 'row' : 'row-reverse' }]}><IconButton icon="settings" label={t('settings')} onPress={() => router.push('/(tabs)/settings')} /><View style={styles.brand}><View><Label style={styles.brandName}>{t('brand')}</Label><Label style={styles.brandSubtitle}>{t('tagline')}</Label></View><View style={styles.brandMark}><Label style={styles.nine}>٩</Label></View></View></View>
      <View><Label style={styles.welcome}>{t('welcome')}</Label><Label subtle>{t('welcomeSub')}</Label></View><HomeHero wide={wide} />
      <View style={styles.action}><Button title={t('start')} icon={rtl ? 'arrow-left' : 'arrow-right'} disabled={!loaded} onPress={() => router.push('/setup')} /><Label subtle style={styles.actionHint}>{t('homeHint')}</Label></View>
      <View style={styles.how}><IconButton icon="arrow-up-left" label={t('rules')} onPress={() => router.push('/(tabs)/rules')} /><View style={styles.flex}><Label style={styles.howTitle}>{t('howTitle')}</Label><Label subtle style={styles.small}>{t('howSub')}</Label></View><Feather name="message-circle" size={25} color={colors.primary} /></View>
      <View style={styles.catalog}><Feather name="layers" size={24} color={colors.gold} /><View style={styles.flex}><Label style={styles.howTitle}>{t('libraryCount')}</Label><Label subtle style={styles.small}>{t('libraryCaption')}</Label></View></View>
      <SectionHeading title={t('moreChallenge')} hint={t('allPacks')} onPress={() => router.push('/(tabs)/packs')} />
    </View>}
    ListFooterComponent={<View style={styles.blocks}>{winner ? <View style={styles.last}><Feather name="award" color={colors.gold} size={24} /><View style={styles.flex}><Label style={styles.howTitle}>{tied ? tr('آخر تحدي انتهى بالتعادل','The last match ended in a tie','La dernière partie était à égalité') : tr(`آخر فوز: ${winner.name}`,`Last winners: ${winner.name}`,`Derniers gagnants : ${winner.name}`)}</Label><Label subtle style={styles.small}>{number(winner.score)} {t('points')}</Label></View></View> : null}<Label subtle style={styles.footer}>{t('footer')}</Label></View>} />
    <PackPreview id={shop.preview} onClose={shop.close} onUnlock={() => { void shop.unlock(); }} />
  </Screen>;
}
export default HomeScreen;
const styles = StyleSheet.create({ flex: { flex: 1 }, list: { gap: spacing.sm, paddingBottom: spacing.sm }, row: { gap: spacing.sm }, blocks: { gap: spacing.md }, header: { alignItems: 'center', justifyContent: 'space-between' }, brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs }, brandMark: { width: 48, height: 48, borderRadius: radii.sm, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '7deg' }] }, nine: { color: colors.background, fontSize: 36, lineHeight: 46, fontWeight: '700', textAlign: 'center' }, brandName: { fontSize: typography.title, fontWeight: '700', color: colors.cream, lineHeight: 34 }, brandSubtitle: { fontSize: typography.small, color: colors.subtle, lineHeight: 22 }, welcome: { fontSize: typography.title, fontWeight: '700', lineHeight: 38 }, action: { gap: spacing.xs }, actionHint: { textAlign: 'center', fontSize: typography.small }, how: { backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.xs, borderWidth: 1, borderColor: colors.border }, howTitle: { fontWeight: '600', fontSize: typography.body }, small: { fontSize: typography.small, lineHeight: 22 }, catalog: { backgroundColor: colors.goldDark, borderRadius: radii.md, padding: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, last: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.sm, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, backgroundColor: colors.goldDark, marginTop: spacing.sm }, footer: { textAlign: 'center', fontSize: typography.small, paddingTop: spacing.sm } });
