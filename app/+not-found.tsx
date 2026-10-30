import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Button, Label } from '@/components/ui/Primitives';
import { useSettings } from '@/hooks/useSettings';
import { colors, radii, spacing, type as typography } from '@/constants/theme';
export function NotFoundScreen() {
  const router = useRouter();
  const { t, tr } = useSettings();
  return <Screen scroll={false}><View style={styles.content}><View style={styles.icon}><Feather name="compass" size={48} color={colors.primary} /></View><Label style={styles.title}>{tr('هذا المسار غير موجود','This page is not available','Cette page est introuvable')}</Label><Label subtle style={styles.body}>{tr('عودوا للّمة وابدأوا تحديًا جديدًا.','Return home and start a new challenge.','Retournez à l’accueil pour lancer un nouveau défi.')}</Label><Button title={t('backHome')} icon="home" onPress={() => router.replace('/(tabs)')} /></View></Screen>;
}
export default NotFoundScreen;
const styles = StyleSheet.create({ content: { flex: 1, justifyContent: 'center', gap: spacing.md }, icon: { width: 96, height: 96, borderRadius: radii.lg, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }, title: { fontSize: typography.title, fontWeight: '700', color: colors.cream, textAlign: 'center', lineHeight: 40 }, body: { textAlign: 'center', lineHeight: 26 } });
