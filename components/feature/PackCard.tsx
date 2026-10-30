import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
import { Label } from '@/components/ui/Primitives';
import { useSettings } from '@/hooks/useSettings';
import type { Pack } from '@/services/gameService';
interface PackCardProps { pack: Pack; unlocked: boolean; onPress: () => void; compact?: boolean; price?: string }
export const PackCard = memo(function PackCard({ pack, unlocked, onPress, compact = false, price }: PackCardProps) {
  const { t, number, rtl } = useSettings();
  const accent = colors[pack.color];
  return <Pressable accessibilityRole="button" accessibilityLabel={pack.name} onPress={onPress} style={({ pressed }) => [styles.card, compact ? styles.compact : null, pressed ? styles.pressed : null]}>
    <View style={[styles.top, { flexDirection: rtl ? 'row' : 'row-reverse' }]}><View style={styles.badge}><Feather name={unlocked ? 'check' : 'lock'} size={14} color={unlocked ? colors.success : colors.gold} /><Label style={{ fontSize: typography.small, color: unlocked ? colors.success : colors.gold }}>{t(unlocked ? 'available' : 'extra')}</Label></View><View style={[styles.icon, { backgroundColor: pack.color === 'success' ? colors.successDark : pack.color === 'gold' ? colors.goldDark : colors.primaryDark }]}><Feather name={pack.icon} color={accent} size={28} /></View></View>
    <Label style={styles.name}>{pack.name}</Label><Label subtle style={styles.subtitle}>{pack.subtitle}</Label>
    <View style={[styles.bottom, { flexDirection: rtl ? 'row' : 'row-reverse' }]}><View style={styles.open}><Feather name={rtl ? 'arrow-up-left' : 'arrow-up-right'} size={16} color={accent} /><Label style={{ color: accent, fontSize: typography.label, fontWeight: '600' }}>{unlocked ? t('playNow') : price ?? pack.price}</Label></View><Label subtle style={{ fontSize: typography.small }}>{number(pack.count)} · {t('questionCount')}</Label></View>
  </Pressable>;
});
const styles = StyleSheet.create({ card: { backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.xs }, compact: { padding: spacing.sm }, pressed: { opacity: 0.75, transform: [{ scale: 0.99 }] }, top: { justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }, badge: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' }, icon: { width: 56, height: 56, borderRadius: radii.sm, alignItems: 'center', justifyContent: 'center' }, name: { fontSize: typography.section, fontWeight: '700' }, subtitle: { fontSize: typography.label }, bottom: { justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.sm, marginTop: spacing.xs, borderTopWidth: 1, borderTopColor: colors.border, flexWrap: 'wrap', gap: spacing.xs }, open: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' } });
