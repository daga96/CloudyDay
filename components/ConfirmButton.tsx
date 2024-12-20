import { Pressable, StyleSheet, Text } from "react-native";

interface ConfirmButtonProps {
  text: string;
  onPress?: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.button}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: "#382215",
    color: "#F6F1F0",
    fontSize: 16,
    borderRadius: 50,
    textAlign: "center",
    width: 250,
    marginBottom: 16,
  },
});

export default ConfirmButton;
