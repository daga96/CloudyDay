import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const Register = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/splash.png")}
        style={styles.logo}
      />
      <View style={styles.form}>
        <Text>Nickname</Text>
        <TextInput style={styles.formInput}></TextInput>
        <Text>Email</Text>
        <TextInput style={styles.formInput}></TextInput>
        <Text>Code</Text>
        <View style={styles.pinInput}>
          <TextInput style={styles.numberInput}></TextInput>
          <TextInput style={styles.numberInput}></TextInput>
          <TextInput style={styles.numberInput}></TextInput>
          <TextInput style={styles.numberInput}></TextInput>
        </View>
        <Text style={styles.privacyInfo}>
          We are committed to providing you with a safe and supportive
          environment. We understand that privacy is crucial, especially in
          sensitive situations. Your information will be stored securely and
          will not be shared with third parties without your consent, except as
          required by law. <br />
          <b>For your safety we won’t sent you any emails</b>
        </Text>
      </View>{" "}
      {/* Button */}
      <Text style={styles.button}>Register </Text>
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
  form: {
    paddingHorizontal: 20,
    flexDirection: "column",
  },

  formInput: {
    backgroundColor: "#ECD8C5",
    height: "40px",
    borderRadius: 10,
  },
  pinInput: {
    flexDirection: "row",
  },
  numberInput: {
    backgroundColor: "#ECD8C5",
    width: "70px",
    height: "70px",
    borderRadius: 15,
    marginHorizontal: 5,
  },
  privacyInfo: {
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
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

export default Register;
