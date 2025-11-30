import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const backendURL = "http://10.2.90.207:5000"; // CHANGE this to your LAN IP if testing on phone

  const generateNotes = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    const res = await axios.post(`${backendURL}/api/ask`, { topic });
    navigation.navigate("Result", { notes: res.data.reply, topic });

    setLoading(false);
  };

  const generateQuiz = async () => {
    if (!topic.trim()) return;

    const res = await axios.post(`${backendURL}/api/quiz`, { topic });
    navigation.navigate("Quiz", { quiz: res.data.quiz, topic });
  };

  const searchVideos = () => {
    navigation.navigate("Videos", { topic });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Powered Study Buddy 📚</Text>

      <TextInput
        value={topic}
        onChangeText={setTopic}
        placeholder="Enter any topic... e.g. Newton's Laws"
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={generateNotes}>
        <Text style={styles.btnText}>{loading ? "Generating..." : "Generate Notes"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={generateQuiz}>
        <Text style={styles.btnText}>Generate Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={searchVideos}>
        <Text style={styles.btnText}>Related Videos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, flex: 1, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#333",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontSize: 18 },
});
