import ConfirmButton from "@/components/ConfirmButton";
import GlobalStyles from "@/styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const ReportWeather = () => {
  const [email, setEmail] = useState<string>("");

  const handleSaveEmail = async () => {
    await AsyncStorage.setItem("email", email);
    router.back();
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <Text style={styles.label}>Hello, please enter your contact email:</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter email"
      />
      <ConfirmButton onPress={handleSaveEmail} text="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  label: {
    fontFamily: "Manrope_700Bold",
    color: "#382215",
    marginTop: 16,
    marginBottom: 5,
  },
  textInput: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#ECD8C5",
    height: 40,
    borderRadius: 10,
    paddingLeft: 16,
    marginBottom: 16,
  },
});

export default ReportWeather;
