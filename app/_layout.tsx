import { SessionProvider } from "@/contexts/AuthContext";
import { StatusProvider } from "@/contexts/StatusContext";
import {
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView, View } from "react-native";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    const prepare = async () => {
      await Location.requestForegroundPermissionsAsync();
      if (fontsLoaded || error) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    // Render an empty view until fonts load to avoid flickering
    return <View style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SessionProvider>
        <StatusProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </StatusProvider>
      </SessionProvider>
    </SafeAreaView>
  );
}
