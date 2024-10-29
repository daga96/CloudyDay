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
      paddingVertical: 8,
      marginRight: 10,
      marginVertical: 5,
      borderWidth: isSelected ? 5 : 0,
      borderColor: "#DFE1CE",
    },
  });

  return (
    <Pressable onPress={onPress}>
      <Text style={styles.tag}>{text}</Text>
    </Pressable>
  );
};

export default Tag;
