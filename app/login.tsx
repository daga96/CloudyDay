import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <Logo />
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
      <ConfirmButton text="Confirm" />
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
    width: 70,
    height: 70,
    borderRadius: 15,
    marginHorizontal: 5,
    textAlign: "center",
  },
  codeInfo: {
    fontWeight: "bold",
  },
});

export default Login;
