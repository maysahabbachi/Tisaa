import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Button, Label } from '@/components/ui/Primitives';
import { PackCard } from '@/components/feature/PackCard';
import { PackPreview } from '@/components/feature/PackPreview';
import { usePackShop } from '@/hooks/usePackShop';
import { useLayout } from '@/hooks/useLayout';
import { useSettings } from '@/hooks/useSettings';
import { getPacks } from '@/services/gameService';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
export function PacksScreen() {
  const shop = usePackShop();
  const { wide } = useLayout();
  const { language, t } = useSettings();
  const packs = useMemo(() => getPacks(language), [language]);
  return <Screen tabs scroll={false}><View><Label style={styles.eyebrow}>{t('library')}</Label><Label style={styles.title}>{t('libraryTitle')}</Label><Label subtle>{t('librarySub')}</Label></View>
    <View style={styles.banner}><Feather name="layers" color={colors.gold} size={30} /><View style={styles.flex}><Label style={styles.bannerTitle}>{t('libraryCount')}</Label><Label subtle style={styles.caption}>{t('libraryCaption')}</Label></View></View>
    <FlatList style={styles.flex} key={wide ? 'wide' : 'phone'} data={packs} numColumns={wide ? 2 : 1} showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} columnWrapperStyle={wide ? styles.row : undefined} keyExtractor={p => p.id} renderItem={({ item }) => <View style={styles.flex}><PackCard pack={item} unlocked={shop.unlocked.includes(item.id)} price={shop.products.find(p => p.id === item.id)?.price} onPress={() => shop.openPack(item.id)} /></View>} ListFooterComponent={<View style={styles.footer}><View style={styles.notice}><Feather name="info" size={20} color={colors.gold} /><Label style={styles.noticeText}>{shop.status === 'ready' ? t('oneTime') : t(shop.status === 'notConfigured' ? 'storeNotReady' : 'nativeOnly')}</Label></View><Button title={shop.busy ? t('restoring') : t('restore')} secondary icon="rotate-ccw" disabled={shop.busy} onPress={() => { void shop.restore(); }} /></View>} />
    <PackPreview id={shop.preview} onClose={shop.close} onUnlock={() => { void shop.unlock(); }} />
  </Screen>;
}
export default PacksScreen;
const styles = StyleSheet.create({ flex: { flex: 1 }, eyebrow: { color: colors.primary, fontSize: typography.label, fontWeight: '600' }, title: { color: colors.cream, fontSize: typography.title, lineHeight: 40, fontWeight: '700' }, banner: { backgroundColor: colors.goldDark, borderRadius: radii.md, padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, bannerTitle: { color: colors.gold, fontSize: typography.section, fontWeight: '700' }, caption: { fontSize: typography.label }, list: { gap: spacing.sm, paddingBottom: spacing.md }, row: { gap: spacing.sm }, footer: { gap: spacing.sm, paddingTop: spacing.sm }, notice: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' }, noticeText: { flex: 1, color: colors.gold, fontSize: typography.label, lineHeight: 24 } });
