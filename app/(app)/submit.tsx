// CreateThread.js
import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import GlobalStyles from "@/styles/globalStyles";
import { router } from "expo-router";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { app } from "../../firebaseConfig";

const SubmitThread = () => {
  const [threadTitle, setThreadTitle] = useState<string>(""); // State for thread title
  const [threadContent, setThreadContent] = useState<string>(""); // State for thread content

  const addThread = async () => {
    if (!threadTitle || !threadContent) {
      Alert.alert("Please enter both a title and content");
      return;
    }

    try {
      const newThread = {
        title: threadTitle,
        content: threadContent,
        date: new Date().toISOString(),
        replies: [],
      };
      const db = getFirestore(app);

      await addDoc(collection(db, "threads"), newThread);
      router.push("/community");
    } catch (error) {
      Alert.alert("Error adding thread", error.message);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Logo />
      <TextInput
        editable
        style={styles.textInput}
        placeholder="Thread Title"
        value={threadTitle}
        onChangeText={setThreadTitle}
      />
      <TextInput
        editable
        multiline
        style={[styles.textInput, styles.contentInput]} // Add a specific style for content input if needed
        placeholder="Create a new thread"
        value={threadContent}
        onChangeText={setThreadContent}
      />
      <ConfirmButton text="Save" onPress={addThread} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "90%",
    backgroundColor: "#ECD8C5",
    borderRadius: 15,
    padding: 20,
    marginBottom: 10, // Add margin for spacing between title and content
  },
  contentInput: {
    minHeight: 300,
  },
});

export default SubmitThread;
