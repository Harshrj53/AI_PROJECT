cat > NotesScreen.tsx << 'EOF'
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function NotesScreen() {
  const { notes, topic } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{topic}</Text>
      <Text style={styles.body}>{notes}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  body: { fontSize: 18, lineHeight: 26 },
});
EOF
