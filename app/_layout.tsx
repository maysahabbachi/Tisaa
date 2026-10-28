import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { GameProvider } from '@/contexts/GameContext';
import { colors } from '@/constants/theme';

export function RootLayout() {
  return <AlertProvider><SafeAreaProvider><GameProvider><StatusBar style="light" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background }, headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text, headerShadowVisible: false, headerTitleStyle: { fontWeight: '700' } }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="setup" options={{ headerShown: true, title: 'جهّزوا اللّمة', headerBackTitle: 'رجوع' }} />
    <Stack.Screen name="game" options={{ gestureEnabled: false }} />
    <Stack.Screen name="results" options={{ headerShown: true, title: 'نتيجة التحدي', headerBackVisible: false }} />
  </Stack></GameProvider></SafeAreaProvider></AlertProvider>;
}
export default RootLayout;
