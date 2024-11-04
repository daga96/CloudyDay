import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <Image
      resizeMode="contain"
      source={require("../assets/images/logo.png")}
      style={styles.logo}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 8,
    width: 100,
    height: 100,
  },
});

export default Logo;
