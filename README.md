# AI Study Buddy

A React Native (Expo) mobile app for college students, integrated with local AI (Ollama).

## Prerequisites

1. **Node.js** & **npm**
2. **Expo CLI**: `npm install -g expo-cli`
3. **Ollama**: Installed and running locally.

## Setup & Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Ollama**:
   Make sure Ollama is running and you have the `llama3` model pulled (or change the model in `src/services/api.js`).
   ```bash
   ollama serve
   ollama pull llama3
   ```
   *Note: The app expects Ollama at `http://localhost:11434`.*

3. **Run the App**:
   ```bash
   npx expo start
   ```
   - Press `i` for iOS Simulator (Mac only).
   - Press `a` for Android Emulator.
   - Scan QR code with Expo Go (Note: Localhost API might not work on physical device without IP configuration).

## Features

- **AI Quiz Generator**: Generate MCQs on any topic.
- **Summary Notes**: Quick summaries.
- **Full Notes**: Detailed structured notes.
- **YouTube Explainer**: Explain videos from URL/Title.
- **Quick Notes**: Manual note-taking.
- **Search History**: Track all your queries.
- **Saved Library**: Access all generated content offline.

## Project Structure

- `src/screens`: UI Screens for each feature.
- `src/components`: Reusable UI components (Card, Button, Input).
- `src/services`: API integration (Ollama).
- `src/storage`: AsyncStorage wrapper for local data persistence.

## Troubleshooting

- **Ollama Connection Error**: Ensure Ollama is running (`ollama serve`). If running on Android Emulator, you might need to change `localhost` to `10.0.2.2` in `src/services/api.js`.
- **Network Request Failed**: Check if the server is reachable. The app includes a fallback "Mock Mode" if the API fails, so you can still demo the UI.
