import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { app } from "../firebaseConfig.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

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

  const handleNicknameChange = (text: string) => {
    setNickname(text);
  };

  const handlePinChange = (text: string) => {
    setPin(text);
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.form}>
        <Text>Nickname</Text>
        <TextInput
          style={styles.formInput}
          value={nickname}
          onChangeText={handleNicknameChange}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.formInput}
          value={email}
          onChangeText={handleEmailChange}
        />
        <Text>Code</Text>
        <View style={styles.pinInput}>
          <TextInput
            style={styles.numberInput}
            value={pin.substring(0, 1)}
            onChangeText={(text) => handlePinChange(text + "")}
          />
          <TextInput
            style={styles.numberInput}
            value={pin.substring(1, 2)}
            onChangeText={(text) =>
              handlePinChange(pin.substring(0, 1) + text + "")
            }
          />
          <TextInput
            style={styles.numberInput}
            value={pin.substring(2, 3)}
            onChangeText={(text) =>
              handlePinChange(pin.substring(0, 3) + text + "")
            }
          />
          <TextInput
            style={styles.numberInput}
            value={pin.substring(3, 4)}
            onChangeText={(text) =>
              handlePinChange(pin.substring(0, 4) + text + "")
            }
          />
        </View>
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
    fontFamily: "Manrope",
  },

  form: {
    paddingHorizontal: 20,
    flexDirection: "column",
  },

  formInput: {
    backgroundColor: "#ECD8C5",
    height: 40,
    borderRadius: 10,
  },
  pinInput: {
    flexDirection: "row",
  },
  numberInput: {
    backgroundColor: "#ECD8C5",
    width: 70,
    height: 70,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  privacyInfo: {
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default Register;
