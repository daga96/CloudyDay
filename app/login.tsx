import { Link } from "expo-router";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/splash.png")}
        style={styles.logo}
      />
      <Text style={styles.infoText}>Enter 4 - digit code to login </Text>
      <View style={styles.pinInput}>
        <TextInput style={styles.numberInput}></TextInput>
        <TextInput style={styles.numberInput}></TextInput>
        <TextInput style={styles.numberInput}></TextInput>
        <TextInput style={styles.numberInput}></TextInput>
      </View>
      <Text style={styles.codeInfo}>
        Don’t have the code? <Link href="/register">Register Here</Link>
      </Text>
      {/* Button */}
      <Text style={styles.button}>Continue </Text>
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
  logo: {
    marginTop: 50,
    width: 150,
    height: 150,
  },
  infoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#382215",
  },
  pinInput: {
    flexDirection: "row",
    marginVertical: 32,
  },
  numberInput: {
    backgroundColor: "#ECD8C5",
    width: "70px",
    height: "70px",
    borderRadius: 15,
    marginHorizontal: 5,
  },
  codeInfo: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#382215",
    color: "#F6F1F0",
    fontSize: 16,
    borderRadius: 50,
    textAlign: "center",
    width: "280px",
  },
});

export default Login;
