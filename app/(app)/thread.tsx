// ThreadDetail.js
import Header from "@/components/Header";
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

const ThreadDetail = () => {
  const [thread, setThread] = useState<Object | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const db = getFirestore(app);
  const { q } = useLocalSearchParams();

  useEffect(() => {
    const fetchThread = async () => {
      if (!q) return; // Ensure there's a thread ID
      const threadRef = doc(db, "threads", q);
      const threadSnapshot = await getDoc(threadRef);
      if (threadSnapshot.exists()) {
        setThread({ id: threadSnapshot.id, ...threadSnapshot.data() });
      } else {
        console.log("No such document!");
      }
    };

    fetchThread();
  }, [q]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const updatedReplies = [...(thread.replies || []), newComment];
      await updateDoc(doc(db, "threads", q), { replies: updatedReplies });
      setNewComment("");
      setThread((prev) => ({ ...prev, replies: updatedReplies })); // Update local state
    }
  };

  if (!thread) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header text="Thread" />
      <View style={styles.threadContent}>
        <Text style={styles.title}>{thread.title}</Text>
        <Text>{thread.content}</Text>{" "}
        <Text style={styles.threadReplies}>
          {thread.replies && thread.replies.length}
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
        {thread.replies ? (
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F6F1F0",
  },
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
