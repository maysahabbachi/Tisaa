import { memo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type TextStyle, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, type as typography } from '@/constants/theme';

type LabelProps = { children: ReactNode; style?: TextStyle | TextStyle[]; subtle?: boolean };
export const Label = memo(function Label({ children, style, subtle = false }: LabelProps) {
  return <Text style={[styles.text, subtle ? styles.subtle : null, style]}>{children}</Text>;
});
type ButtonProps = { title: string; onPress: () => void; secondary?: boolean; disabled?: boolean; icon?: keyof typeof Feather.glyphMap; style?: ViewStyle };
export const Button = memo(function Button({ title, onPress, secondary = false, disabled = false, icon, style }: ButtonProps) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, secondary ? styles.secondary : null, disabled ? styles.disabled : null, pressed ? styles.pressed : null, style]}>
    {icon ? <Feather name={icon} size={20} color={secondary ? colors.text : colors.background} /> : null}
    <Label style={[styles.buttonText, { color: secondary ? colors.text : colors.background }]}>{title}</Label>
  </Pressable>;
});
type IconButtonProps = { icon: keyof typeof Feather.glyphMap; onPress: () => void; label: string };
export const IconButton = memo(function IconButton({ icon, onPress, label }: IconButtonProps) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [styles.iconButton, pressed ? styles.pressed : null]}><Feather name={icon} size={20} color={colors.text} /></Pressable>;
});
type ChipProps = { title: string; selected: boolean; onPress: () => void };
export const Chip = memo(function Chip({ title, selected, onPress }: ChipProps) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.chip, selected ? styles.chipSelected : null, pressed ? styles.pressed : null]}><Label style={{ color: selected ? colors.background : colors.subtle, fontWeight: '600' }}>{title}</Label></Pressable>;
});
type SectionProps = { title: string; hint?: string; onPress?: () => void };
export const SectionHeading = memo(function SectionHeading({ title, hint, onPress }: SectionProps) {
  return <View style={styles.sectionHeading}>{hint ? <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => [styles.link, pressed ? styles.pressed : null]}><Label style={{ color: colors.primary, fontSize: typography.label }}>{hint}</Label>{onPress ? <Feather name="arrow-left" size={16} color={colors.primary} /> : null}</Pressable> : <View />}<Label style={styles.sectionTitle}>{title}</Label></View>;
});
const styles = StyleSheet.create({
  text: { color: colors.text, fontSize: typography.body, lineHeight: 26, textAlign: 'right', includeFontPadding: false },
  subtle: { color: colors.subtle }, button: { minHeight: 56, borderRadius: radii.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.xs, paddingHorizontal: spacing.md },
  buttonText: { fontWeight: '700', fontSize: typography.body }, secondary: { backgroundColor: colors.raised, borderWidth: 1, borderColor: colors.border }, disabled: { opacity: 0.45 }, pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  iconButton: { width: 48, height: 48, borderRadius: radii.sm, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  chip: { flex: 1, height: 48, borderRadius: radii.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, paddingHorizontal: spacing.xs, borderWidth: 1, borderColor: colors.border }, chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }, sectionTitle: { fontSize: typography.section, fontWeight: '700' }, link: { minHeight: 44, alignItems: 'center', flexDirection: 'row', gap: spacing.xs },
});
