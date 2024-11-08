import { Dimensions, StyleSheet, Text, View } from "react-native";
import Logo from "./Logo";

const Header = ({ text }: { text: string }) => {
  return (
    <View>
      <View style={styles.topHeader}>
        <Logo />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topHeader: {
    width: Dimensions.get("window").width,
    backgroundColor: "#ECD8C5",
    alignItems: "center",
    height: 200,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#382215",
  },
});

export default Header;
