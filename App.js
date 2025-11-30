import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Screens
import { HomeScreen } from './src/screens/HomeScreen';
import { QuizGeneratorScreen } from './src/screens/QuizGeneratorScreen';
import { SummaryGeneratorScreen } from './src/screens/SummaryGeneratorScreen';
import { FullNotesGeneratorScreen } from './src/screens/FullNotesGeneratorScreen';
import { VideoExplainerScreen } from './src/screens/VideoExplainerScreen';
import { QuickNotesScreen } from './src/screens/QuickNotesScreen';
import { SearchHistoryScreen } from './src/screens/SearchHistoryScreen';
import { SavedNotesScreen } from './src/screens/SavedNotesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: '#4A90E2',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QuizGenerator"
            component={QuizGeneratorScreen}
            options={{ title: 'AI Quiz' }}
          />
          <Stack.Screen
            name="SummaryGenerator"
            component={SummaryGeneratorScreen}
            options={{ title: 'Summary' }}
          />
          <Stack.Screen
            name="FullNotesGenerator"
            component={FullNotesGeneratorScreen}
            options={{ title: 'Full Notes' }}
          />
          <Stack.Screen
            name="VideoExplainer"
            component={VideoExplainerScreen}
            options={{ title: 'Video Explainer' }}
          />
          <Stack.Screen
            name="QuickNotes"
            component={QuickNotesScreen}
            options={{ title: 'Quick Notes' }}
          />
          <Stack.Screen
            name="SearchHistory"
            component={SearchHistoryScreen}
            options={{ title: 'History' }}
          />
          <Stack.Screen
            name="SavedNotes"
            component={SavedNotesScreen}
            options={{ title: 'Saved Library' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
