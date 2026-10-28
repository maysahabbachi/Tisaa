import { FlatList, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Label } from '@/components/ui/Primitives';
import { PackCard } from '@/components/feature/PackCard';
import { PackPreview } from '@/components/feature/PackPreview';
import { usePackShop } from '@/hooks/usePackShop';
import { useLayout } from '@/hooks/useLayout';
import { packs } from '@/services/gameService';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
export function PacksScreen() {
  const shop = usePackShop();
  const { wide } = useLayout();
  return <Screen tabs scroll={false}><View><Label style={styles.eyebrow}>مكتبة تسعة!</Label><Label style={styles.title}>لكل لَمّة، أسئلتها.</Label><Label subtle>اختاروا موضوعكم المفضل وابدأوا التحدي.</Label></View>
    <View style={styles.banner}><Feather name="layers" color={colors.gold} size={30} /><View style={{ flex: 1 }}><Label style={styles.bannerTitle}>٢٠ سؤالًا عربيًا أصليًا</Label><Label subtle style={styles.caption}>إجابات منطقية. نقاط غير متوقعة.</Label></View></View>
    <FlatList style={{ flex: 1 }} key={wide ? 'wide' : 'phone'} data={packs} numColumns={wide ? 2 : 1} showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} columnWrapperStyle={wide ? styles.row : undefined} keyExtractor={p => p.id} renderItem={({ item }) => <View style={{ flex: 1, maxWidth: wide ? '49%' : '100%' }}><PackCard pack={item} unlocked={shop.unlocked.includes(item.id)} onPress={() => shop.openPack(item.id)} /></View>} ListFooterComponent={<View style={styles.notice}><Feather name="info" size={18} color={colors.gold} /><Label style={styles.noticeText}>الحزم الإضافية متاحة بفتح تجريبي مجاني.{ '\n' }الشراء الحقيقي غير مفعّل في هذه النسخة.</Label></View>} />
    <PackPreview id={shop.preview} onClose={shop.close} onUnlock={shop.unlock} />
  </Screen>;
}
export default PacksScreen;
const styles = StyleSheet.create({ eyebrow: { color: colors.primary, fontSize: typography.label, fontWeight: '600' }, title: { color: colors.cream, fontSize: typography.title, lineHeight: 40, fontWeight: '700' }, banner: { backgroundColor: colors.goldDark, borderRadius: radii.md, padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, bannerTitle: { color: colors.gold, fontSize: typography.section, fontWeight: '700' }, caption: { fontSize: typography.label }, list: { gap: spacing.sm, paddingBottom: spacing.md }, row: { gap: spacing.sm }, notice: { flexDirection: 'row-reverse', gap: spacing.xs, alignItems: 'center', padding: spacing.sm }, noticeText: { flex: 1, color: colors.gold, fontSize: typography.label, lineHeight: 24 } });
