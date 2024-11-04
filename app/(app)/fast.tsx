import ConfirmButton from "@/components/ConfirmButton";
import ExitButton from "@/components/ExitButton";
import Header from "@/components/Header";
import Tag from "@/components/Tag";
import { useStatus } from "@/contexts/StatusContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const FastAssessment = () => {
  const { status, setStatusData } = useStatus();

  const tagsArray = [
    "Partner",
    "Family",
    "Roomate",
    "Ex-spouse",
    "Physical",
    "Emotional",
    "Verbal",
    "Sexual",
    "Financial",
    "Daily",
    "Weekly",
    "Monthly",
    "Occasionally",
    "Weapon",
    "Isolating",
    "Monitoring",
    "Restricting",
    "Home",
    "No-Support",
    "Limited Support",
    "Substance abuse",
    "Stalking",
    "Children",
    "Jealousy",
  ];

  async function Gemini() {
    const query =
      "Evaluate the level of danger described tags chosen by a domestic violence victim and categorize it as one of the following: Safe, Caution, Danger, or Immediate Danger. Begin the response with the appropriate category, followed by an asterisk (*). After the asterisk, kindly explain why the situation falls under that category, using empathetic language." +
      JSON.stringify(tags);
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
  }
  const [tags, setTags] = useState(
    tagsArray.reduce((acc, tag) => ({ ...acc, [tag]: false }), {})
  );

  const toggleTag = (tag: string) => {
    setTags((prevTags) => ({
      ...prevTags,
      [tag]: !prevTags[tag],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header text="Assess Danger" />
      <Text style={styles.description}>
        Choose tags that describe your situation
      </Text>
      <View style={styles.tags}>
        {Object.keys(tags).map((tag) => (
          <Tag
            key={tag}
            text={tag}
            isSelected={tags[tag]}
            onPress={() => toggleTag(tag)}
          />
        ))}
      </View>
      <ConfirmButton text="Continue" onPress={Gemini} />
      <ExitButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  description: {
    textAlign: "center",
    color: "#382215",
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
  },
});
export default FastAssessment;
