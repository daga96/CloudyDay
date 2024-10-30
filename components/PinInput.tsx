import { StyleSheet, TextInput, View } from "react-native";

interface PinInputProps {
  pin: string;
  handlePinChange: (text: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({ pin, handlePinChange }) => {
  return (
    <View style={styles.pinInput}>
      <TextInput
        style={styles.numberInput}
        value={pin.substring(0, 1)}
        onChangeText={(text) => handlePinChange(text + "")}
      />
      <TextInput
        style={styles.numberInput}
        value={pin.substring(1, 2)}
        onChangeText={(text) =>
          handlePinChange(pin.substring(0, 1) + text + "")
        }
      />
      <TextInput
        style={styles.numberInput}
        value={pin.substring(2, 3)}
        onChangeText={(text) =>
          handlePinChange(pin.substring(0, 3) + text + "")
        }
      />
      <TextInput
        style={styles.numberInput}
        value={pin.substring(3, 4)}
        onChangeText={(text) =>
          handlePinChange(pin.substring(0, 4) + text + "")
        }
      />
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
