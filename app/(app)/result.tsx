import ExitButton from "@/components/ExitButton";
import Logo from "@/components/Logo";
import { useSession } from "@/contexts/AuthContext";
import { useStatus } from "@/contexts/StatusContext";
import { router } from "expo-router";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { app } from "../../firebaseConfig";
const StatusResult = () => {
  const { status } = useStatus();
  const session = useSession();
  const { assessment, message } = status;
  const getImageSource = () => {
    const currentStatus = assessment?.toLowerCase();
    switch (currentStatus) {
      case "safe":
        return require("../../assets/images/safe.png");
      case "caution":
        return require("../../assets/images/caution.png");
      case "danger":
        return require("../../assets/images/danger.png");
      case "immediate danger":
        return require("../../assets/images/immediate-danger.png");
      default:
        return;
    }
  };

  const saveToFirebase = async () => {
    if (!session) {
      console.error("Error saving assessment to Firebase: session is null");
      return;
    }

    const db = getFirestore(app);
    const assessmentRef = collection(db, "assessments");
    const now = new Date();

    const assessmentData = {
      Date: now.toISOString(),
      Assessment: status?.assessment,
      Description: status?.message,
    };

    try {
      await setDoc(
        doc(assessmentRef, session.session?.replace('"', "")),
        assessmentData
      );
      console.log("Assessment saved to Firebase with userEmail as document ID");
    } catch (error) {
      console.error("Error saving assessment to Firebase:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={getImageSource()} style={styles.top}>
        <Logo />
        <Text style={styles.title}> {assessment}</Text>
      </ImageBackground>
      <View style={styles.description}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttons}>
          <Text
            style={styles.button}
            onPress={() => {
              router.push("/main");
            }}
          >
            Home
          </Text>
          <Text
            style={styles.button}
            onPress={() => {
              saveToFirebase();
            }}
          >
            Save
          </Text>
        </View>
      </View>
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
  },

  top: {
    flex: 0.7,
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#382215",
  },

  description: { flex: 1, marginHorizontal: 32 },

  message: {
    textAlign: "left",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#382215",
    color: "#FFFFFF",
    borderRadius: 50,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

export default StatusResult;
