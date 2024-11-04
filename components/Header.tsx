import { router, useSegments } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "./Logo";

const Header = ({ text }: { text: string }) => {
  const currentRoute = useSegments()[1];

  return (
    <View>
      <View style={styles.topHeader}>
        <View style={styles.homeIcon}>
          {currentRoute !== "main" && (
            <TouchableOpacity onPress={() => router.push("/main")}>
              <Image source={require("../assets/images/home.png")} />
            </TouchableOpacity>
          )}
        </View>
        <Logo />
        <Text style={styles.text}>{text}</Text>
      </View>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#ECD8C5"
          d="M0,288L48,277.3C96,267,192,245,288,229.3C384,213,480,203,576,218.7C672,235,768,277,864,256C960,235,1056,149,1152,128C1248,107,1344,149,1392,170.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </View>
  );
};
const styles = StyleSheet.create({
  topHeader: {
    width: Dimensions.get("window").width,
    backgroundColor: "#ECD8C5",
    alignItems: "center",
  },
  homeIcon: {
    width: "100%",
    justifyContent: "flex-start",
    padding: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#382215",
  },
});

export default Header;
