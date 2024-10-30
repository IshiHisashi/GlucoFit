import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import CarbsLogScreen from "../screens/logScreens/CarbsLogScreen";
import ActivityLogScreen from "../screens/logScreens/ActivityLogScreen";
import MedicineLogScreen from "../screens/logScreens/MedicineLogScreen";
import GlucoseLogScreen from "../screens/logScreens/GlucoseLogScreen";
import NoteScreen from "../screens/logScreens/NoteScreen";
import { AppStackParamList } from "../../types/navigation";
import ArticleWebViewScreen from "../screens/insightsSubScreens/ArticleWebViewScreen";
import RecentInsightsScreen from "../screens/insightsSubScreens/RecentInsightsScreen";
import Temp from "../screens/Temp";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CarbsLog"
        component={CarbsLogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ActivityLog"
        component={ActivityLogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MedicineLog"
        component={MedicineLogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GlucoseLog"
        component={GlucoseLogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Note"
        component={NoteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleWebViewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecentInsights"
        component={RecentInsightsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Temp"
        component={Temp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppStack;
