import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
import { Label } from '@/components/ui/Primitives';
import { packs } from '@/services/gameService';

type PackCardProps = { pack: typeof packs[number]; unlocked: boolean; onPress: () => void; compact?: boolean };
export const PackCard = memo(function PackCard({ pack, unlocked, onPress, compact = false }: PackCardProps) {
  const accent = colors[pack.color];
  return <Pressable accessibilityRole="button" accessibilityLabel={pack.name} onPress={onPress} style={({ pressed }) => [styles.card, compact ? styles.compact : null, pressed ? styles.pressed : null]}>
    <View style={styles.top}><View style={styles.badge}><Feather name={unlocked ? 'check' : 'lock'} size={12} color={unlocked ? colors.success : colors.gold} /><Label style={{ fontSize: typography.small, color: unlocked ? colors.success : colors.gold }}>{unlocked ? 'متاحة للعب' : 'حزمة إضافية'}</Label></View><View style={[styles.icon, { backgroundColor: pack.color === 'success' ? colors.successDark : pack.color === 'gold' ? colors.goldDark : colors.primaryDark }]}><Feather name={pack.icon} color={accent} size={28} /></View></View>
    <Label style={styles.name}>{pack.name}</Label><Label subtle style={styles.subtitle}>{pack.subtitle}</Label>
    <View style={styles.bottom}><View style={styles.open}><Feather name="arrow-up-left" size={16} color={accent} /><Label style={{ color: accent, fontSize: typography.label, fontWeight: '600' }}>{unlocked ? 'العب الآن' : pack.price}</Label></View><Label subtle style={{ fontSize: typography.small }}>{pack.count} سؤالًا أصليًا</Label></View>
  </Pressable>;
});
const styles = StyleSheet.create({ card: { backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.xs }, compact: { padding: spacing.sm }, pressed: { opacity: 0.75, transform: [{ scale: 0.99 }] }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }, badge: { flexDirection: 'row', gap: 4, alignItems: 'center' }, icon: { width: 56, height: 56, borderRadius: radii.sm, alignItems: 'center', justifyContent: 'center' }, name: { fontSize: typography.section, fontWeight: '700' }, subtitle: { fontSize: typography.label }, bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.sm, marginTop: spacing.xs, borderTopWidth: 1, borderTopColor: colors.border }, open: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' } });
