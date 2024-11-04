import ConfirmButton from "@/components/ConfirmButton";
import ExitButton from "@/components/ExitButton";
import Header from "@/components/Header";
import { useStatus } from "@/contexts/StatusContext";
import GlobalStyles from "@/styles/globalStyles";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const DetailedAssessmentScreen = () => {
  const [userInput, setUserInput] = useState<string>("");
  const { status, setStatusData } = useStatus();

  const handleUserInput = (text: string) => {
    setUserInput(text);
  };

  const assessDanger = async () => {
    const query =
      "Evaluate the level of danger described by a domestic violence victim and categorize it as one of the following: Safe, Caution, Danger, or Immediate Danger. Begin the response with the appropriate category, followed by an asterisk (*). After the asterisk, kindly explain why the situation falls under that category, using empathetic language." +
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
    <View style={GlobalStyles.container}>
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
