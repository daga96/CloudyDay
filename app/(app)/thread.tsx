// ThreadDetail.tsx
import Header from "@/components/Header";
import GlobalStyles from "@/styles/globalStyles";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { app } from "../../firebaseConfig";

interface Thread {
  id: string;
  title: string;
  content: string;
  replies?: string[];
}

const ThreadDetail: React.FC = () => {
  const [thread, setThread] = useState<Thread | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const db = getFirestore(app);
  const { q } = useLocalSearchParams<{ q: string }>();

  useEffect(() => {
    const fetchThread = async () => {
      if (!q) return; // Ensure there's a thread ID
      const threadRef = doc(db, "threads", q);
      const threadSnapshot = await getDoc(threadRef);
      if (threadSnapshot.exists()) {
        setThread({
          id: threadSnapshot.id,
          ...threadSnapshot.data(),
        } as Thread);
      } else {
        console.log("No such document!");
      }
    };

    fetchThread();
  }, [q]);

  const handleAddComment = async () => {
    if (newComment.trim() && thread) {
      const updatedReplies = [...(thread.replies || []), newComment];
      await updateDoc(doc(db, "threads", q), { replies: updatedReplies });
      setNewComment("");
      setThread((prev) => (prev ? { ...prev, replies: updatedReplies } : null)); // Update local state
    }
  };

  if (!thread) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={GlobalStyles.container}>
      <Header text="Thread" />
      <View style={styles.threadContent}>
        <Text style={styles.title}>{thread.title}</Text>
        <Text>{thread.content}</Text>
        <Text style={styles.threadReplies}>
          {thread.replies ? thread.replies.length : 0}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Add a comment..."
      />
      <TouchableOpacity style={styles.button} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.commentsContainer}>
        {thread.replies && thread.replies.length > 0 ? (
          thread.replies.map((reply, index) => (
            <Text key={index} style={styles.comment}>
              {reply}
            </Text>
          ))
        ) : (
          <Text>No comments yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  threadContent: {
    width: "90%",
    backgroundColor: "#ECD8C5",
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  commentsContainer: {
    marginVertical: 20,
  },
  comment: {
    marginVertical: 5,
    padding: 10,
    width: 320,
    borderRadius: 5,
  },
  input: {
    width: "90%",
    backgroundColor: "#ECD8C5",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#382215",
    color: "#FFFFFF",
    borderRadius: 50,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  buttonText: {
    color: "#fff",
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

export default ThreadDetail;
