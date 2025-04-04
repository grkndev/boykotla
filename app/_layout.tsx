import '@/global.css';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, SourGummy_400Regular, SourGummy_700Bold } from "@expo-google-fonts/sour-gummy"
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  // Create a client
  const queryClient = new QueryClient()

  const [loaded] = useFonts({
    SourGummy_400Regular,
    SourGummy_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </QueryClientProvider >

  );
}
