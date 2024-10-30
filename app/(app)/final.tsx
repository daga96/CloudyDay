import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import { StyleSheet, Text, View } from "react-native";

const RegistrationFinal = () => {
  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F6F1F0",
    fontFamily: "Manrope",
  },
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
