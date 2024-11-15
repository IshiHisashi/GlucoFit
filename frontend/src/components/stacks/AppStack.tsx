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
import AutoLogScreen from "../screens/logScreens/AutoLogScreen"
import OfflineLogsScreen from "../screens/logScreens/OfflineLogsScreen";
import Temp from "../screens/Temp";
import ProfileScreen from "../screens/profileScreens/ProfileScrenn";
import EditProfileScreen from "../screens/profileScreens/EditProfileScreen";
import ChangePasswordScreen from "../screens/profileScreens/ChangePasswordScreen";
import ManageAccountScreen from "../screens/profileScreens/ManageAccount";
import MedicationScreen from "../screens/profileScreens/Medication";
import HealthDataScreen from "../screens/profileScreens/HealthDataScreen";
import DevAndAppScreen from "../screens/profileScreens/DevAndAppScreen";
import AddMedecineScreen from "../screens/profileScreens/AddMedicineScreen";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => (
  // <NavigationContainer>
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
      name="AutoLog"
      component={AutoLogScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OfflineLogs"
      component={OfflineLogsScreen}
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
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="EditProfile"
      component={EditProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="ManageAccount"
      component={ManageAccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Medications"
      component={MedicationScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="HealthData"
      component={HealthDataScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DevAndApp"
      component={DevAndAppScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="AddMedecine"
      component={AddMedecineScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
  // </NavigationContainer>
);

export default AppStack;
