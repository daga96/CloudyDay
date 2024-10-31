import { router } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ConfirmButton from "../components/ConfirmButton";
import Logo from "../components/Logo";
import PinInput from "../components/PinInput";
import { app } from "../firebaseConfig.js";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegisterUser = async () => {
    const auth = getAuth(app);
    const password = pin + "0000";
    if (pin.length !== 4 || isNaN(pin)) {
      setError("PIN must be a 4-digit number");
      return;
    }
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          router.push("/final");
        }
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePinChange = (text: string) => {
    setPin(text);
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.formInput}
          value={email}
          onChangeText={handleEmailChange}
        />
        <Text style={styles.label}>Code</Text>
        <PinInput pin={pin} handlePinChange={handlePinChange} />
        <Text style={styles.privacyInfo}>
          We are committed to providing you with a safe and supportive
          environment. We understand that privacy is crucial, especially in
          sensitive situations. Your information will be stored securely and
          will not be shared with third parties without your consent, except as
          required by law. <br />
          <b>For your safety we won’t sent you any emails</b>
        </Text>
      </View>

      <ConfirmButton text="Register" onPress={handleRegisterUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F6F1F0",
  },

  form: {
    paddingHorizontal: 20,
    flexDirection: "column",
  },

  label: {
    fontFamily: "Manrope_700Bold",
    color: "#382215",
    marginTop: 16,
    marginBottom: 5,
  },
  formInput: {
    backgroundColor: "#ECD8C5",
    height: 40,
    borderRadius: 10,
    paddingLeft: 16,
  },

  privacyInfo: {
    textAlign: "center",
    marginHorizontal: 20,
    marginVertical: 20,
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: "#382215",
  },
});

export default Register;
