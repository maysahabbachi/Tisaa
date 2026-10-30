import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { GameProvider } from '@/contexts/GameContext';
import { colors } from '@/constants/theme';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { useSettings } from '@/hooks/useSettings';

function RootNavigator() {
  const { t, tr } = useSettings();
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background }, headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text, headerShadowVisible: false, headerTitleStyle: { fontWeight: '700' } }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="setup" options={{ headerShown: true, title: t('setupTitle'), headerBackTitle: tr('رجوع','Back','Retour') }} />
    <Stack.Screen name="game" options={{ gestureEnabled: false }} />
    <Stack.Screen name="results" options={{ headerShown: true, title: t('resultTitle'), headerBackVisible: false }} />
  </Stack>;
}
export function RootLayout() {
  return <AlertProvider><SafeAreaProvider><SettingsProvider><GameProvider><StatusBar style="light" /><RootNavigator /></GameProvider></SettingsProvider></SafeAreaProvider></AlertProvider>;
}
export default RootLayout;
