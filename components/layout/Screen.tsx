import { type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, type as typography } from '@/constants/theme';
import { IconButton, Label } from '@/components/ui/Primitives';
import { useSettings } from '@/hooks/useSettings';

type ScreenProps = { children: ReactNode; tabs?: boolean; scroll?: boolean; input?: boolean };
export function Screen({ children, tabs = false, scroll = true, input = false }: ScreenProps) {
  const content = scroll ? <ScrollView style={styles.flex} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"><View style={styles.inner}>{children}</View></ScrollView> : <View style={[styles.content, styles.flex]}><View style={[styles.inner, styles.flex]}>{children}</View></View>;
  return <SafeAreaView edges={tabs ? ['top'] : ['top', 'bottom']} style={styles.root}>{input ? <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>{content}</KeyboardAvoidingView> : content}</SafeAreaView>;
}
type HeaderProps = { title: string; subtitle?: string; onBack?: () => void };
export function Header({ title, subtitle, onBack }: HeaderProps) {
  const router = useRouter();
  const { tr } = useSettings();
  return <View style={styles.header}><IconButton icon="arrow-left" label={tr('رجوع','Back','Retour')} onPress={onBack ?? (() => router.back())} /><View style={styles.heading}><Label style={styles.title}>{title}</Label>{subtitle ? <Label subtle style={styles.subtitle}>{subtitle}</Label> : null}</View></View>;
}
const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.background }, flex: { flex: 1 }, content: { padding: spacing.md, paddingBottom: spacing.lg }, inner: { width: '100%', maxWidth: 900, alignSelf: 'center', gap: spacing.md }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm }, heading: { flex: 1 }, title: { fontSize: typography.title, fontWeight: '700', lineHeight: 38 }, subtitle: { fontSize: typography.label }, });
