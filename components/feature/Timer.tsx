import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, type as typography } from '@/constants/theme';
import { Label } from '@/components/ui/Primitives';

type TimerProps = { seconds: number; active: boolean };
export const Timer = memo(function Timer({ seconds, active }: TimerProps) {
  const urgent = active && seconds <= 10;
  const color = urgent ? colors.danger : colors.primary;
  return <View accessibilityLiveRegion="polite" accessibilityLabel={`${seconds} ثانية متبقية`} style={[styles.circle, { borderColor: color }]}><Label style={[styles.number, { color }]}>{seconds.toLocaleString('ar')}</Label><Label subtle style={styles.caption}>ثانية</Label></View>;
});
const styles = StyleSheet.create({ circle: { width: 88, height: 88, borderRadius: 44, borderWidth: 4, backgroundColor: colors.shade, alignItems: 'center', justifyContent: 'center', padding: spacing.xs }, number: { fontSize: 30, fontWeight: '700', lineHeight: 36, textAlign: 'center' }, caption: { fontSize: typography.small, lineHeight: 18, textAlign: 'center' } });
