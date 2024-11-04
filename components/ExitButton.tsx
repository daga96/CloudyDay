import { BackHandler, Pressable, StyleSheet, Text } from "react-native";

const ExitButton = () => {
  const onPress = () => {
    BackHandler.exitApp();
  };
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.button}>Quit Exit</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#BD4848",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 50,
    textAlign: "center",
    width: 250,
  },
});

export default ExitButton;
