cat > VideosScreen.tsx << 'EOF'
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

export default function VideosScreen() {
  const { topic } = useLocalSearchParams();
  const [videos, setVideos] = useState([]);

  const backendURL = "http://10.2.90.207:5000";

  const fetchVideos = async () => {
    const res = await axios.get(`${backendURL}/api/youtube?q=${topic}`);
    setVideos(res.data.videos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Videos for: {topic}</Text>

      {videos.map((v, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${v.id.videoId}`)}
          style={styles.card}
        >
          <Text style={styles.videoTitle}>{v.snippet.title}</Text>
          <Text style={styles.channel}>{v.snippet.channelTitle}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  card: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  videoTitle: { fontWeight: "700", fontSize: 16, marginBottom: 5 },
  channel: { color: "#555" },
});
EOF
