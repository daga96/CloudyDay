import ExitButton from "@/components/ExitButton";
import Header from "@/components/Header";
import { Image, StyleSheet, Text, View } from "react-native";

const AssessDanger = () => {
  const assessmentOptions = [
    {
      label: "Fast",
      duration: "1 min",
      backgroundColor: "#C4DAB4",
      color: "#43551E",
    },
    {
      label: "Detailed",
      duration: "2-5 min",
      backgroundColor: "#CDD2F6",
      color: "#413A65",
    },
  ];

  return (
    <View style={styles.container}>
      <Header text="Assess Danger" />
      <Text style={styles.description}>
        Choose between a Fast assessment for quick insights or a Detailed one
        for a deeper evaluation. Both options offer personalized guidance and
        safety tips.
      </Text>
      {assessmentOptions.map((option, index) => (
        <View key={index} style={styles.buttonElement}>
          <View style={styles.time}>
            <Image source={require("../assets/images/time.png")} />
            <Text>{option.duration}</Text>
          </View>
          <Text
            style={[
              styles.button,
              { backgroundColor: option.backgroundColor, color: option.color },
            ]}
          >
            {option.label}
          </Text>
        </View>
      ))}
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
    fontFamily: "Manrope",
  },
  description: {
    textAlign: "center",
    color: "#382215",
    width: "80%",
  },
  buttonElement: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  time: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    padding: 15,
    fontSize: 16,
    borderRadius: 50,
    textAlign: "center",
    width: 250,
  },
});

export default AssessDanger;
