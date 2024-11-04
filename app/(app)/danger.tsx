import ExitButton from "@/components/ExitButton";
import Header from "@/components/Header";
import { useSession } from "@/contexts/AuthContext";
import { app } from "@/firebaseConfig";
import GlobalStyles from "@/styles/globalStyles";
import { router } from "expo-router";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AssessDanger = () => {
  const { session } = useSession();
  const [assessments, setAssessments] = useState<Array<any>>([]);
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

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    const db = getFirestore(app);
    const assessmentRef = collection(db, "assessments");

    const documentId = session?.replace('"', "");
    const documentRef = doc(assessmentRef, documentId);

    try {
      // Fetch the document
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        // If the document exists, set the fetched assessments
        const assessments = docSnap.data();
        setAssessments([assessments]);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching assessments: ", error);
    }
  };

  const formatDate = (date) => {
    return date.split("T")[0];
  };
  const AssessmentList = () => {
    return assessments.map((assessment, index) => (
      <AssessmentItem key={index} assessment={assessment} />
    ));
  };

  const AssessmentItem = ({ assessment }) => {
    const backgroundColor = getBackgroundColor(assessment.Assessment);
    const textColor = getTextColor(assessment.Assessment);

    return (
      <View style={[styles.item, { backgroundColor }]}>
        <Text style={[{ color: textColor }, styles.date]}>
          {formatDate(assessment.Date)}
        </Text>
        <Text style={[{ color: textColor }, styles.assessment]}>
          {assessment.Assessment}
        </Text>
      </View>
    );
  };

  const getBackgroundColor = (assessment: string) => {
    switch (assessment) {
      case "Safe":
        return "#C4DAB4";
      case "Caution":
        return "#FEEE93";
      case "Danger":
        return "#F2C7B1";
      case "Immediate Danger":
        return "#D34848";
      default:
        return "#FFFFFF";
    }
  };

  const getTextColor = (assessment: string) => {
    switch (assessment) {
      case "Safe":
        return "#43551E";
      case "Caution":
        return "#C38116";
      case "Danger":
        return "#AE6321";
      default:
        return "#000000"; // default text color
    }
  };

  return (
    <ScrollView contentContainerStyle={GlobalStyles.container}>
      <Header text="Assess Danger" />
      {assessments.length > 0 && (
        <Text style={styles.title}>Previous Assesment</Text>
      )}
      <AssessmentList />
      <Text style={styles.description}>
        Choose between a Fast assessment for quick insights or a Detailed one
        for a deeper evaluation. Both options offer personalized guidance and
        safety tips.
      </Text>
      {assessmentOptions.map((option, index) => (
        <View key={index} style={styles.buttonElement}>
          <View style={styles.time}>
            <Image source={require("../../assets/images/time.png")} />

            <Text>{option.duration}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              const path = option?.label === "Fast" ? "/fast" : "/detailed";
              router.push(path);
            }}
          >
            <Text
              style={[
                styles.button,
                {
                  backgroundColor: option.backgroundColor,
                  color: option.color,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <ExitButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    fontFamily: "Manrope_400Regular",
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
    fontFamily: "Manrope_400Regular",
  },
  button: {
    padding: 15,
    fontSize: 16,
    borderRadius: 50,
    textAlign: "center",
    width: 250,
  },

  item: {
    width: "80%",
    backgroundColor: "#C4DAB4",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
  },

  date: {
    fontFamily: "Manrope_700Bold",
  },
  assessment: {
    fontFamily: "Manrope_700Bold",
    fontSize: 24,
  },
  title: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: "#382215",
    marginVertical: 4,
  },
});

export default AssessDanger;
