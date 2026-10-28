import Tabs from 'expo-router/tabs';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
export function TabLayout() {
  const insets = useSafeAreaInsets();
  return <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border, borderTopWidth: 1, height: Platform.select({ ios: insets.bottom + 60, android: insets.bottom + 60, default: 70 }), paddingTop: 8, paddingBottom: Platform.select({ ios: insets.bottom + 8, android: insets.bottom + 8, default: 8 }), paddingHorizontal: 16 }, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.subtle, tabBarLabelStyle: { fontSize: 12, fontWeight: '600' } }}>
    <Tabs.Screen name="index" options={{ title: 'اللّمة', tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} /> }} />
    <Tabs.Screen name="packs" options={{ title: 'الحزم', tabBarIcon: ({ color, size }) => <Feather name="layers" color={color} size={size} /> }} />
    <Tabs.Screen name="rules" options={{ title: 'طريقة اللعب', tabBarIcon: ({ color, size }) => <Feather name="help-circle" color={color} size={size} /> }} />
  </Tabs>;
}
export default TabLayout;
