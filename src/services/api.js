import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Dynamically determines the base URL for Ollama.
 * - Android Emulator: 10.0.2.2
 * - Physical Device / Other: Uses the Expo host IP (your computer's IP).
 * - Fallback: localhost
 */
const getBaseUrl = () => {
  // If running on Android Emulator, use special loopback
  if (Platform.OS === 'android' && !Constants.isDevice) {
    return 'http://10.0.2.2:11434/api/generate';
  }

  // If running on iOS Simulator, use localhost (Ollama binds to 127.0.0.1 by default)
  if (Platform.OS === 'ios' && !Constants.isDevice) {
    return 'http://localhost:11434/api/generate';
  }

  // If we can get the host URI (machine's IP) from Expo Constants
  // This is needed for physical devices
  if (Constants.expoConfig?.hostUri) {
    const host = Constants.expoConfig.hostUri.split(':')[0];
    return `http://${host}:11434/api/generate`;
  }

  // Fallback to localhost
  return 'http://localhost:11434/api/generate';
};

/**
 * Sends a prompt to the local Ollama instance.
 * @param {string} prompt - The prompt to send.
 * @param {string} model - The model to use (default: llama3).
 * @returns {Promise<string>} - The generated text.
 */
export const generateResponse = async (prompt, model = 'gemma3:4b') => {
  const apiUrl = getBaseUrl();

  try {
    console.log(`Sending request to Ollama at ${apiUrl}: ${model} - ${prompt.substring(0, 50)}...`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Ollama connection failed:', error);
    return getFallbackResponse(prompt);
  }
};

/**
 * Provides a dummy fallback response if Ollama is not reachable.
 * This ensures the app is usable for demos even without the backend running.
 */
const getFallbackResponse = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('quiz')) {
    return JSON.stringify([
      {
        question: `What is the main concept of ${prompt.split('topic:')[1] || 'this topic'}?`,
        options: ['Fundamental Principle', 'Secondary Effect', 'Unrelated Theory', 'Obsolete Idea'],
        answer: 'Fundamental Principle'
      },
      {
        question: 'Which of the following is true?',
        options: ['It is static', 'It is dynamic', 'It is undefined', 'None of the above'],
        answer: 'It is dynamic'
      },
      {
        question: 'Who is associated with this field?',
        options: ['Alan Turing', 'Marie Curie', 'Albert Einstein', 'Isaac Newton'],
        answer: 'Alan Turing'
      }
    ]);
  } else if (lowerPrompt.includes('summary')) {
    return `**Mock Summary (Ollama Offline)**\n\nThis is a simulated summary for the requested topic. The local Ollama instance seems to be unreachable. In a real scenario, this would contain a concise summary of the content.`;
  } else if (lowerPrompt.includes('explain this video')) {
    return `**Mock Video Explanation (Ollama Offline)**\n\nBased on the video URL provided, this video likely covers key concepts related to the title. (Simulated response).`;
  } else {
    return `**Mock Response (Ollama Offline)**\n\nGenerated content for: "${prompt}". \n\nPlease ensure Ollama is running at ${getBaseUrl()} with 'gemma3:4b' model pulled.`;
  }
};
