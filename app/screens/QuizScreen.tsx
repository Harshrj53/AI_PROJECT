cat > QuizScreen.tsx << 'EOF'
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function QuizScreen() {
  const { quiz, topic } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{topic} – Quiz</Text>
      <Text style={styles.body}>{quiz}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  body: { fontSize: 18, lineHeight: 26 },
});
EOF
