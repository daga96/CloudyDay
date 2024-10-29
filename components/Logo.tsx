import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <Image
      resizeMode="contain"
      source={require("../assets/images/splash.png")}
      style={styles.logo}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 50,
    width: 150,
    height: 150,
  },
});

export default Logo;
