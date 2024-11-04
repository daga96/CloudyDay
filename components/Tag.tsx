import { Pressable, StyleSheet, Text } from "react-native";

interface TagProps {
  text: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const Tag = ({ text, isSelected = false, onPress }: TagProps) => {
  const styles = StyleSheet.create({
    tag: {
      backgroundColor: isSelected ? "#C4DAB4" : "#FFFFFF",
      borderRadius: isSelected ? 100 : 100,
      color: isSelected ? "#FFFFFF" : "#382215",
      paddingHorizontal: 16,
      paddingVertical: 4,
      marginRight: 10,
      marginVertical: 5,
      borderWidth: 5,
      borderColor: isSelected ? "#DFE1CE" : "transparent",
    },
  });

  return (
    <Pressable onPress={onPress}>
      <Text style={styles.tag}>{text}</Text>
    </Pressable>
  );
};

export default Tag;
