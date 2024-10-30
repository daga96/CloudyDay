import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface MenuButtonProps {
  text: String;
  onPress?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ text, onPress }) => {
  const getButtonConfig = () => {
    switch (text) {
      case "Assess Danger":
        return {
          backgroundColor: "#C4DAB4",
          textColor: "#43551E",
          iconName: "danger.png",
        };
      case "Create Safe Plan":
        return {
          backgroundColor: "#FEEE93",
          textColor: "#C38116",
          iconName: "safe.png",
        };
      case "Community":
        return {
          backgroundColor: "#A18FFD",
          textColor: "#413A65",
          iconName: "info.png",
        };
      default:
        return {
          backgroundColor: "#E0E0E0",
          textColor: "#000000",
        };
    }
  };
  const { backgroundColor, textColor, iconName } = getButtonConfig();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    width: 325,
    height: 75,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 32,
  },
});
export default MenuButton;
