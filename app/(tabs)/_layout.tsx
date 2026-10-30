import Tabs from 'expo-router/tabs';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
import { useSettings } from '@/hooks/useSettings';
export function TabLayout() {
  const insets = useSafeAreaInsets();
  const { t } = useSettings();
  return <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border, borderTopWidth: 1, height: Platform.select({ ios: insets.bottom + 60, android: insets.bottom + 60, default: 70 }), paddingTop: 8, paddingBottom: Platform.select({ ios: insets.bottom + 8, android: insets.bottom + 8, default: 8 }), paddingHorizontal: 16 }, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.subtle, tabBarLabelStyle: { fontSize: 12, fontWeight: '600' } }}>
    <Tabs.Screen name="index" options={{ title: t('home'), tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} /> }} />
    <Tabs.Screen name="packs" options={{ title: t('packs'), tabBarIcon: ({ color, size }) => <Feather name="layers" color={color} size={size} /> }} />
    <Tabs.Screen name="rules" options={{ title: t('rules'), tabBarIcon: ({ color, size }) => <Feather name="help-circle" color={color} size={size} /> }} />
    <Tabs.Screen name="settings" options={{ title: t('settings'), tabBarIcon: ({ color, size }) => <Feather name="settings" color={color} size={size} /> }} />
  </Tabs>;
}
export default TabLayout;
