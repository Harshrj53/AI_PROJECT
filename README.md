AI Study Buddy

A React Native (Expo) mobile app for college students, powered by local AI using Ollama.

🎥 Demo Video Link: https://youtube.com/shorts/uHzOAKRzFEc?si=i7OIXGl8zJN4nK0Y


📌 Features
AI Tools

AI Quiz Generator (MCQs for any topic)

Summary Notes (short notes)

Full Notes (detailed structured notes)

YouTube Explainer (explain any video from URL/title)

Quick Notes (manual note-taking)

Search History (auto-tracked)

Saved Library (offline access to all generated content)

App Features

React Native + Expo

Local storage with AsyncStorage

Supports offline reading of saved notes

Clean UI suitable for college project submission

🎯 Using Ollama in This App

This app uses Ollama, a local AI model runner.
It runs completely offline on your system.

1. Start Ollama
ollama serve

2. Install Required Model
ollama pull llama3

3. Model Used in App

Located in:
src/services/api.js

Example:

model: "llama3"

4. Emulator Network Settings
Platform	Base URL
iOS / Web	http://localhost:11434

Android Emulator	http://10.0.2.2:11434

If Ollama doesn’t connect, update the URL in:
src/services/api.js

📦 Prerequisites

Node.js & npm

Expo CLI

npm install -g expo-cli


Ollama installed from: https://ollama.com

🚀 Setup & Run
1. Install Dependencies
npm install

2. Start Ollama
ollama serve
ollama pull llama3

3. Run the App
npx expo start


Press i → Run on iOS Simulator

Press a → Run on Android Emulator

Scan QR code → Run on Expo Go app

Note: Localhost API might not work on a physical device unless you replace localhost with your machine IP.

📂 Project Structure
src/
 ├── screens/        # UI screens
 ├── components/     # UI components
 ├── services/       # Ollama API requests
 ├── storage/        # AsyncStorage helpers

🛠 Troubleshooting
Ollama Connection Error

Make sure Ollama is running:

ollama serve


Also confirm the correct IP in:

src/services/api.js

Network Request Failed

Use 10.0.2.2 on Android Emulator

Check if Ollama server is running

App has a fallback Mock Mode for offline demos
