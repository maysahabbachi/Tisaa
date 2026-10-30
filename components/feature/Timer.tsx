import { memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, cancelAnimation } from 'react-native-reanimated';
import { colors, spacing, type as typography } from '@/constants/theme';
import { Label } from '@/components/ui/Primitives';
import { useSettings } from '@/hooks/useSettings';
interface TimerProps { seconds: number; active: boolean }
export const Timer = memo(function Timer({ seconds, active }: TimerProps) {
  const { t, number } = useSettings();
  const urgent = active && seconds <= 10;
  const color = urgent ? colors.danger : colors.primary;
  const scale = useSharedValue(1);
  useEffect(() => { if (urgent) scale.value = withSequence(withTiming(1.07, { duration: 120 }), withTiming(1, { duration: 120 })); else scale.value = 1; return () => cancelAnimation(scale); }, [urgent, seconds, scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return <Animated.View accessibilityLabel={`${number(seconds)} ${t('seconds')}`} style={[styles.circle, { borderColor: color }, animatedStyle]}><Label style={[styles.number, { color }]}>{number(seconds)}</Label><Label subtle style={styles.caption}>{t('seconds')}</Label></Animated.View>;
});
const styles = StyleSheet.create({ circle: { width: 88, height: 88, borderRadius: 44, borderWidth: 4, backgroundColor: colors.shade, alignItems: 'center', justifyContent: 'center', padding: spacing.xs }, number: { fontSize: 30, fontWeight: '700', lineHeight: 36, textAlign: 'center' }, caption: { fontSize: typography.small, lineHeight: 18, textAlign: 'center' } });
