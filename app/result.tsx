import ExitButton from "@/components/ExitButton";
import Logo from "@/components/Logo";
import { useStatus } from "@/contexts/StatusContext";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const StatusResult = () => {
  const { status } = useStatus();
  const { assessment, message } = status;
  const getImageSource = () => {
    const currentStatus = assessment?.toLowerCase();
    switch (currentStatus) {
      case "safe":
        return require("../assets/images/safe.png");
      case "caution":
        return require("../assets/images/caution.png");
      case "danger":
        return require("../assets/images/danger.png");
      case "immediate danger":
        return require("../assets/images/immediate-danger.png");
      default:
        return;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={getImageSource()} style={styles.top}>
        <Logo />
        <Text style={styles.title}> {assessment}</Text>
      </ImageBackground>
      <View>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttons}>
          <Text style={styles.button}>Home</Text>
          <Text style={styles.button}>Save</Text>
        </View>
      </View>
      <ExitButton />
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
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    textAlign: "center",
    alignItems: "center",
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  message: {
    textAlign: "left",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#382215",
    color: "#FFFFFF",
    borderRadius: 50,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

export default StatusResult;
