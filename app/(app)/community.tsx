// Forum.js
import ConfirmButton from "@/components/ConfirmButton";
import Header from "@/components/Header";
import { router } from "expo-router";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { app } from "../../firebaseConfig";

const Community = () => {
  const [threads, setThreads] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const db = getFirestore(app);

      const threadsCollection = collection(db, "threads");
      const threadsSnapshot = await getDocs(threadsCollection);
      const threadsList = threadsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setThreads(threadsList);
    };

    fetchThreads();
  }, []);

  const handleThreadPress = (threadId: string) => {
    router.push(`/thread?q=${threadId}`);
  };

  const timeSince = (dateString: Date) => {
    const now = Date.now();
    const postDate = new Date(dateString).getTime();
    const seconds = Math.floor((now - postDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;
    if (months < 12) return `${months} months ago`;
    return `${years} years ago`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Community" />
      <ConfirmButton text="Add Thread" onPress={() => router.push("/submit")} />
      <View style={{ marginTop: 20 }}>
        {threads.map((thread) => (
          <TouchableOpacity
            key={thread.id}
            style={styles.threadContainer}
            onPress={() => handleThreadPress(thread.id)}
          >
            <Text> {timeSince(thread.date)} </Text>
            <Text style={styles.threadTitle}>{thread.content}</Text>
            <Text style={styles.threadReplies}>
              {thread.replies && thread.replies.length}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F6F1F0",
  },
  threadContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ECD8C5",
    borderRadius: 5,
    width: 320,
  },
  threadTitle: {
    fontWeight: "bold",
  },
  threadReplies: {
    alignSelf: "flex-end",
    backgroundColor: "#382215",
    color: "#FFFFFF",
    borderRadius: 50,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    textAlign: "center",
  },
});

export default Community;
