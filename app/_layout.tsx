import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/NotesScreen" />
      <Stack.Screen name="screens/QuizScreen" />
      <Stack.Screen name="screens/VideosScreen" />
    </Stack>
  );
}
