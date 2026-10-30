import { memo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
import { Label } from '@/components/ui/Primitives';
import { type Answer } from '@/services/gameService';
import { useSettings } from '@/hooks/useSettings';

type AnswerGridProps = { answers: Answer[]; selected: number[]; disabled: boolean; onSelect: (index: number) => void; wide: boolean };
export const AnswerGrid = memo(function AnswerGrid({ answers, selected, disabled, onSelect, wide }: AnswerGridProps) {
  const columns = wide ? 3 : 2;
  const { t, number, rtl } = useSettings();
  return <FlatList key={columns} data={answers} numColumns={columns} scrollEnabled={false} columnWrapperStyle={[styles.row, { flexDirection: rtl ? 'row-reverse' : 'row' }]} contentContainerStyle={styles.list} keyExtractor={(_, i) => String(i)} renderItem={({ item, index }) => {
    const chosen = selected.includes(index);
    const negative = item.points < 0;
    return <Pressable accessibilityRole="button" accessibilityLabel={`${item.text}, ${number(item.points)} ${t('points')}`} accessibilityState={{ selected: chosen, disabled: disabled || chosen }} disabled={disabled || chosen} onPress={() => onSelect(index)} style={({ pressed }) => [styles.card, { width: wide ? '31.8%' : '48.5%' }, chosen ? { backgroundColor: negative ? colors.dangerDark : colors.successDark, borderColor: negative ? colors.danger : colors.success } : null, pressed ? styles.pressed : null]}>
      <View style={styles.top}><View style={[styles.points, { backgroundColor: negative ? colors.dangerDark : colors.goldDark }]}><Label style={{ color: negative ? colors.danger : colors.gold, fontSize: typography.label, fontWeight: '700', textAlign: 'center' }}>{item.points > 0 ? '+' : ''}{number(item.points)}</Label></View>{chosen ? <Feather name={negative ? 'alert-circle' : 'check-circle'} size={16} color={negative ? colors.danger : colors.success} /> : <Label subtle style={{ fontSize: typography.small }}>{String(index + 1).padStart(2, '0')}</Label>}</View><Label style={styles.answer}>{item.text}</Label>
    </Pressable>;
  }} />;
});
const styles = StyleSheet.create({ list: { gap: spacing.xs }, row: { flexDirection: 'row-reverse', gap: spacing.xs }, card: { minHeight: 96, backgroundColor: colors.surface, borderRadius: radii.sm, borderWidth: 1, borderColor: colors.border, padding: 12, justifyContent: 'space-between', gap: spacing.xs }, pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, points: { minWidth: 32, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }, answer: { fontWeight: '600', fontSize: typography.body } });
