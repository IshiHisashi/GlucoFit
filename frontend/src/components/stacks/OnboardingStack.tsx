import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import onboardingTitleScreen from "../screens/onboardingScreens/onbordingTItleScreen";
import NameBdScreen from "../screens/onboardingScreens/NameBdScreen";
import HightWeightScreen from "../screens/onboardingScreens/HightWeightScreen";
import DiabeticTypeScreen from "../screens/onboardingScreens/DiabeticTypeScreen";
import MedicationScreen from "../screens/onboardingScreens/MedicationScreen";
import MedicineListScreen from "../screens/onboardingScreens/MedicineListScreen";
import BslRangeScreen from "../screens/onboardingScreens/bslRangeScreen";
import NotificationConfigScreen from "../screens/onboardingScreens/NotificationConfigScreen";
import AllDoneScreen from "../screens/onboardingScreens/AllDoneScreen";
import type { OnboardingStackParamList } from "../../types/navigation";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={onboardingTitleScreen}
        options={{
          title: "Onboarding",
          headerBackTitleVisible: false,
          headerTintColor: "#4800FF",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NameBdScreen"
        component={NameBdScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#4800FF",
        }}
      />
      <Stack.Screen
        name="HightWeightScreen"
        component={HightWeightScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#4800FF",
        }}
      />
      <Stack.Screen
        name="DiabeticTypeScreen"
        component={DiabeticTypeScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#4800FF",
        }}
      />
      <Stack.Screen
        name="MedicationScreen"
        component={MedicationScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#4800FF",
        }}
      />
      <Stack.Screen
        name="MedicineListScreen"
        component={MedicineListScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#4800FF",
        }}
      />
      <Stack.Screen
        name="BslRangeScreen"
        component={BslRangeScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#4800FF",
        }}
      />
      <Stack.Screen
        name="NotificationConfigScreen"
        component={NotificationConfigScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#4800FF",
        }}
      />
      <Stack.Screen
        name="AllDoneScreen"
        component={AllDoneScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#4800FF",
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
