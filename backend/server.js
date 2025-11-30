require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const OLLAMA_BASE = process.env.OLLAMA_BASE || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";
const YT_KEY = process.env.YOUTUBE_API_KEY || "";

// Helper — call Ollama LLM
async function askOllama(prompt) {
  const res = await axios.post(`${OLLAMA_BASE}/api/generate`, {
    model: OLLAMA_MODEL,
    prompt: prompt
  });

  return res.data.response;
}

// 📌 Route 1 — Generate Notes
app.post("/api/ask", async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
    Explain the topic "${topic}" in simple student-friendly language.
    Include:
    - Summary
    - Key points
    - Examples
    - What to revise
    `;

    const reply = await askOllama(prompt);

    res.json({ ok: true, reply });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// 📌 Route 2 — Generate Quiz
app.post("/api/quiz", async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
    Create a 5-question MCQ quiz about ${topic}.
    Format:
    Q1: ...
    A) ...
    B) ...
    C) ...
    D) ...
    Correct Answer: ...
    `;

    const reply = await askOllama(prompt);

    res.json({ ok: true, quiz: reply });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// 📌 Route 3 — YouTube Search
app.get("/api/youtube", async (req, res) => {
  try {
    const query = req.query.q;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${query}&key=${YT_KEY}`;
    const response = await axios.get(url);

    res.json({ ok: true, videos: response.data.items });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
