import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import PinInput from "@/components/PinInput";
import { useSession } from "@/contexts/AuthContext";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSession();

  const handleEmailChange = (text) => setEmail(text);
  const handlePinChange = (text) => setPin(text);

  const handleLoginUser = async () => {
    const password = pin + "0000";
    if (pin.length !== 4) {
      setError("PIN must be a 4-digit number");
      return;
    }
    try {
      await signIn(email, password);
      router.push("/main");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.textInput, { marginBottom: 16 }]}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email Address"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Enter 4 - digit code to login </Text>
        <PinInput pin={pin} handlePinChange={handlePinChange} />
      </View>
      <Text style={styles.codeInfo}>
        Don’t have the code? <Link href="/register">Register Here</Link>
      </Text>
      <ConfirmButton text="Confirm" onPress={handleLoginUser} />
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
  label: {
    fontFamily: "Manrope_700Bold",
    color: "#382215",
    marginTop: 16,
    marginBottom: 5,
  },
  pinInput: {
    flexDirection: "row",
    marginVertical: 32,
  },
  textInput: {
    backgroundColor: "#ECD8C5",
    height: 40,
    borderRadius: 10,
    paddingLeft: 16,
  },
  codeInfo: {
    marginVertical: 24,
    color: "#382215",
    fontFamily: "Manrope_700Bold",
  },
});

export default Login;
