import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function QuizScreen({ route }) {
  const { quiz, topic } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{topic} – Quiz</Text>
      <Text style={styles.quiz}>{quiz}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  quiz: { fontSize: 18, lineHeight: 26 },
});
