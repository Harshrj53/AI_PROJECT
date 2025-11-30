import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { router } from "expo-router";

export default function Home() {
  const [topic, setTopic] = useState("");

  const backendURL = "http://10.2.90.207:5000";

  const generateNotes = async () => {
    const res = await axios.post(`${backendURL}/api/ask`, { topic });
    router.push({
      pathname: "/screens/NotesScreen",
      params: { notes: res.data.reply, topic },
    });
  };

  const generateQuiz = async () => {
    const res = await axios.post(`${backendURL}/api/quiz`, { topic });
    router.push({
      pathname: "/screens/QuizScreen",
      params: { quiz: res.data.quiz, topic },
    });
  };

  const searchVideos = () => {
    router.push({
      pathname: "/screens/VideosScreen",
      params: { topic },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Study Buddy 📚</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter topic..."
        value={topic}
        onChangeText={setTopic}
      />

      <TouchableOpacity style={styles.btn} onPress={generateNotes}>
        <Text style={styles.btnText}>Generate Notes</Text>
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
  container: { flex: 1, justifyContent: "center", padding: 25 },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 25, textAlign: "center" },
  input: { borderWidth: 1, padding: 15, borderRadius: 10, marginBottom: 20 },
  btn: { backgroundColor: "#333", padding: 15, borderRadius: 10, marginVertical: 8 },
  btnText: { color: "white", fontSize: 18, textAlign: "center" },
});
