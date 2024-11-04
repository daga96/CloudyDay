import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import PinInput from "@/components/PinInput";
import { useSession } from "@/contexts/AuthContext";
import GlobalStyles from "@/styles/globalStyles";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { signIn } = useSession();

  const handleEmailChange = (text: string) => setEmail(text);
  const handlePinChange = (text: string) => setPin(text);

  const handleLoginUser = async () => {
    const password = pin + "0000";
    if (pin.length !== 4) {
      setError("PIN must be a 4-digit number");
      return;
    }
    const loginSuccess = await signIn(email, password);
    if (loginSuccess) {
      router.push("/main");
    } else {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <View style={GlobalStyles.container}>
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
      <Text style={GlobalStyles.errorText}>{error}</Text>
      <ConfirmButton text="Confirm" onPress={handleLoginUser} />
    </View>
  );
};

const styles = StyleSheet.create({
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
