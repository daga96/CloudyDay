import ExitButton from "@/components/ExitButton";
import Header from "@/components/Header";
import MenuButton from "@/components/MenuButton";
import { useSession } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const menuItems = ["Assess Danger", "Create Safe Plan", "Community"];

const Main = () => {
  const { session } = useSession();

  return (
    <View style={styles.container}>
      <Header text={`Hi! ${session?.replace(/"/g, "")}`} />

      <View>
        <Text style={styles.title}>Take Action</Text>
        {menuItems.map((item, index) => {
          const path = item.split(" ").slice(-1)[0].toLowerCase();
          return (
            <MenuButton
              key={index}
              text={item}
              onPress={() => router.push(path)}
            />
          );
        })}
      </View>
      <ExitButton />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F6F1F0",
    fontFamily: "Manrope",
  },
  title: {
    fontSize: 24,
    fontFamily: "Manrope_700Bold",
    color: "#382215",
    marginVertical: 20,
  },
});

export default Main;
