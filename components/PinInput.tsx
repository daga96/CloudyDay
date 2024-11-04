import { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface PinInputProps {
  pin: string;
  handlePinChange: (text: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({ pin, handlePinChange }) => {
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    // Update the pin
    let newPin = pin.split("");
    newPin[index] = text;
    handlePinChange(newPin.join(""));

    // Focus on the next input if it exists and text is entered
    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <View style={styles.pinInput}>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.numberInput}
            value={pin[index] || ""}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pinInput: {
    flexDirection: "row",
    justifyContent: "center",
  },
  numberInput: {
    backgroundColor: "#ECD8C5",
    width: 70,
    height: 70,
    borderRadius: 15,
    marginHorizontal: 5,
    textAlign: "center",
    fontFamily: "Manrope_700Bold",
    fontSize: 32,
    color: "#382215",
  },
});

export default PinInput;
