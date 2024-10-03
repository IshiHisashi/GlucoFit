import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TestScreen from "../screens/TestScreen";
import AnotherTestScreen from "../screens/AnotherTestScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const TestStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Test"
      component={TestScreen}
      options={{
        title: "Test Page",
        headerStyle: {
          backgroundColor: "#2c3e50",
        },
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    />
    <Stack.Screen
      name="Another"
      component={AnotherTestScreen}
      options={{
        title: "Another Test Page",
        headerStyle: {
          backgroundColor: "#2c3e50",
        },
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    />
  </Stack.Navigator>
);

export default TestStack;
