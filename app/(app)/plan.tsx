import ConfirmButton from "@/components/ConfirmButton";
import Header from "@/components/Header";
import Tag from "@/components/Tag";
import { useSession } from "@/contexts/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { app } from "../../firebaseConfig";

const steps = [
  {
    title: "Safe Place to Go",
    question:
      "Where could you go if you need to leave quickly? (Check all that apply)",
    answers: [
      "Friend's house",
      "Family house",
      "Neighbour's house",
      "Hotel",
      "Shelter",
      "I don't know",
    ],
  },
  {
    title: "Children",
    question: "Would you take your children with you?",
    answers: ["Yes", "No", "I don't have children"],
  },
  {
    title: "Transport",
    question: "How will you get there? (Check all that apply)",
    answers: [
      "Personal vehicle",
      "Public transport",
      "Taxi or rideshare",
      "Walking",
      "Friend’s / Family’s vehicle",
    ],
  },
  {
    title: "Items to Take with You",
    question: "What items do you need to take?",
    answers: [
      "ID (driver's license, passport)",
      "Important documents",
      "Keys",
      "Money",
      "Clothes",
      "Medications",
    ],
  },
  {
    title: "Financials",
    question: "Do you have access to money if you need to leave?",
    answers: ["Yes", "No"],
  },
  {
    title: "Support Nearby",
    question: "Do you have anyone you can talk to about it?",
    answers: ["Yes", "No"],
  },
];

const SafePlan = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [currentPlan, setCurrentPlan] = useState<Object | null>(null);

  const [answers, setAnswers] = useState({});
  const lastStep = currentStep < steps.length - 1;
  const { session } = useSession();
  const db = getFirestore(app);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleAnswer = (answer) => {
    const currentAnswers = answers[currentStep] || [];
    const newAnswers = currentAnswers.includes(answer)
      ? currentAnswers.filter((a) => a !== answer)
      : [...currentAnswers, answer];
    setAnswers({
      ...answers,
      [currentStep]: newAnswers,
    });
  };

  const saveToFirebase = async () => {
    if (!session) {
      console.error("Error saving plan to Firebase: session is null");
      return;
    }

    const planRef = collection(db, "plans");
    try {
      await setDoc(doc(planRef, session?.replace('"', "")), answers);
    } catch (error) {
      console.error("Error saving plan to Firebase:", error);
    }
  };

  const getCurrentPlan = async () => {
    if (!session) {
      console.error("Error retrieving plan from Firebase: session is null");
      return;
    }

    const planRef = doc(db, "plans", session?.replace('"', ""));
    try {
      const planDoc = await getDoc(planRef);
      if (planDoc.exists()) {
        const plan = planDoc.data();

        setCurrentPlan(plan);
        setCurrentStep(steps.length);
      } else {
        console.log("No plan found for this user.");
      }
    } catch (error) {
      console.error("Error retrieving plan from Firebase:", error);
    }
  };

  const handleStart = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  return (
    <View style={styles.container}>
      <Header text="Create Safe Plan" />
      {currentStep === -1 ? (
        <View style={styles.buttons}>
          <ConfirmButton text={"Start"} onPress={handleStart} />
          <br />
          <ConfirmButton text={"Current Plan"} onPress={getCurrentPlan} />
        </View>
      ) : currentStep === steps.length ? (
        <View>
          {currentPlan ? (
            <View>
              <Text style={styles.title}>Your Current Plan:</Text>
              {Object.keys(currentPlan).map((key, index) => (
                <View key={index}>
                  <Text style={styles.title}>{steps[key].title}</Text>
                  <Text>{currentPlan[key].join(", ")}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ) : (
        <View style={styles.text}>
          <Text style={styles.title}>{steps[currentStep].title}</Text>
          <Text style={styles.message}>{steps[currentStep].question}</Text>
          {steps[currentStep].answers.map((answer, index) => (
            <Tag
              key={index}
              text={answer}
              isSelected={answers[currentStep]?.includes(answer)}
              onPress={() => handleAnswer(answer)}
            />
          ))}
          <TouchableOpacity onPress={lastStep ? handleNext : saveToFirebase}>
            <Text style={styles.button}>{lastStep ? "Next" : "Submit"}</Text>
          </TouchableOpacity>
        </View>
      )}
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

  text: {
    textAlign: "left",
    marginHorizontal: 20,
    color: "#382215",
  },
  message: {
    color: "#382215",
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
  },
  buttons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
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
export default SafePlan;
