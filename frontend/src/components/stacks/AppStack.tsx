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

///////////////////////////////
// remaining tasks:
// - Add the correct icons for the tab bar
// - Change how sub menu appears (slide up from bottom with animations?)
// - Change the sub menu styling and content overall
// - OnClose for sub menu
// - Solve some type issues
// - and so on~~~
///////////////////////////////

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CarbsLog" component={CarbsLogScreen} />
      <Stack.Screen name="ActivityLog" component={ActivityLogScreen} />
      <Stack.Screen name="MedicineLog" component={MedicineLogScreen} />
      <Stack.Screen name="GlucoseLog" component={GlucoseLogScreen} />
      <Stack.Screen name="Note" component={NoteScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppStack;
