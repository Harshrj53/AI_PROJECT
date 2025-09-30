import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AllInOne" component={() => <Text>All In One Screen</Text>} />
        <Stack.Screen name="ShortNotes" component={() => <Text>Short Notes Screen</Text>} />
        <Stack.Screen name="Videos" component={() => <Text>Videos Screen</Text>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
