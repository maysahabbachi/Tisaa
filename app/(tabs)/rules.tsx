import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button, Label } from '@/components/ui/Primitives';
import { useSettings } from '@/hooks/useSettings';
import { getRules } from '@/services/rulesService';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
export function RulesScreen() {
  const router = useRouter();
  const { language, t, number } = useSettings();
  const rules = useMemo(() => getRules(language), [language]);
  return <Screen tabs scroll={false}><View><Label style={styles.eyebrow}>{t('rulesEyebrow')}</Label><Label style={styles.title}>{t('rulesTitle')}</Label></View><FlatList style={styles.flex} data={rules} keyExtractor={item => item.title} showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} renderItem={({ item, index }) => <View style={styles.card}><View style={styles.top}><Label style={styles.number}>{number(index + 1)}</Label><View style={styles.icon}><Feather name={item.icon} size={22} color={colors.primary} /></View></View><Label style={styles.cardTitle}>{item.title}</Label><Label subtle style={styles.body}>{item.text}</Label></View>} ListFooterComponent={<View style={styles.footer}><Button title={t('understood')} icon="arrow-left" onPress={() => router.push('/setup')} /></View>} /></Screen>;
}
export default RulesScreen;
const styles = StyleSheet.create({ flex: { flex: 1 }, eyebrow: { color: colors.primary, fontSize: typography.label }, title: { fontSize: 32, color: colors.cream, fontWeight: '700', lineHeight: 44 }, list: { gap: spacing.sm, paddingBottom: spacing.sm }, card: { backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.xs }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, number: { fontSize: typography.title, color: colors.subtle, fontWeight: '600' }, icon: { width: 44, height: 44, backgroundColor: colors.primaryDark, borderRadius: radii.sm, alignItems: 'center', justifyContent: 'center' }, cardTitle: { fontSize: typography.section, fontWeight: '700' }, body: { lineHeight: 28 }, footer: { paddingTop: spacing.sm } });
