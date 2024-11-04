import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import GlobalStyles from "@/styles/globalStyles";
import { StyleSheet, Text, View } from "react-native";

const RegistrationFinal = () => {
  return (
    <View style={GlobalStyles.container}>
      <Logo />
      <View style={styles.wrapper}>
        <Text style={styles.alertInfo}>
          Your account <br /> was successfully created!
        </Text>
        <ConfirmButton text="Home" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  alertInfo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#382215",
    textAlign: "center",
  },
});

export default RegistrationFinal;
