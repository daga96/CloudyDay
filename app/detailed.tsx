import ConfirmButton from "@/components/ConfirmButton";
import ExitButton from "@/components/ExitButton";
import Header from "@/components/Header";
import { useStatus } from "@/contexts/StatusContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const DetailedAssessmentScreen = () => {
  const [userInput, setUserInput] = useState("");
  const { status, setStatusData } = useStatus();

  const handleUserInput = (text: string) => {
    setUserInput(text);
  };

  const assessDanger = async () => {
    const query =
      "Please assess danger situation of the domestic violence victim based on their description of the situation into one of four categories safe| caution | danger | immediate danger. After category please put one *. Please add some sort of justification of the situation." +
      userInput;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });
    const chat = model.startChat();
    const result = await chat.sendMessage(query);
    const response = result.response;

    if (response) {
      const [assessment, message] =
        response.candidates[0]?.content.parts[0].text?.split("*".trim());

      setStatusData({
        assessment,
        message,
      });

      router.push("/result");
    }
  };

  return (
    <View style={styles.container}>
      <Header text="Assess Danger" />
      <Text style={styles.description}>
        Freely write down anything that's happening!
      </Text>
      <TextInput
        editable
        multiline
        style={styles.textInput}
        onChangeText={(text) => handleUserInput(text)}
      />

      <ConfirmButton text="Continue" onPress={assessDanger} />
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
    marginVertical: 20,
  },

  textInput: {
    width: "90%",
    minHeight: 300,
    backgroundColor: "#ECD8C5",
    borderRadius: 15,
    padding: 20,
    flexWrap: "wrap",
  },
});

export default DetailedAssessmentScreen;
