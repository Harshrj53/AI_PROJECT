import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ResultScreen({ route }) {
  const { notes, topic } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{topic}</Text>
      <Text style={styles.body}>{notes}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
  body: { fontSize: 18, lineHeight: 26 },
});
