import ExitButton from "@/components/ExitButton";
import Header from "@/components/Header";
import MenuButton from "@/components/MenuButton";
import { StyleSheet, Text, View } from "react-native";

const menuItems = ["Assess Danger", "Create Safe Plan", "Resources"];

const Main = () => {
  return (
    <View style={styles.container}>
      <Header text="Hi! Placeholder" />

      <View>
        <Text>Take Action</Text>
        {menuItems.map((item, index) => (
          <MenuButton key={index} text={item} />
        ))}
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
});

export default Main;
