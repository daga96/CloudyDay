// app/_layout.tsx
import { StatusProvider } from "@/contexts/StatusContext";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </StatusProvider>
    </SafeAreaView>
  );
}
