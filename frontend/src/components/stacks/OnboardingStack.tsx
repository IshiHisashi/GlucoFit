import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import onboardingTitleScreen from "../screens/onboardingScreens/onbordingTItleScreen";
import NameBdScreen from "../screens/onboardingScreens/NameBdScreen";
import HightWeightScreen from "../screens/onboardingScreens/HightWeightScreen";
import DiabeticTypeScreen from "../screens/onboardingScreens/DiabeticTypeScreen";
import MedicationScreen from "../screens/onboardingScreens/MedicationScreen";
import MedicineListScreen from "../screens/onboardingScreens/MedicineListScreen";
import BslRangeScreen from "../screens/onboardingScreens/bslRangeScreen";
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
          headerTintColor: "#555",
        }}
      />
      <Stack.Screen
        name="NameBdScreen"
        component={NameBdScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#555",
        }}
      />
      <Stack.Screen
        name="HightWeightScreen"
        component={HightWeightScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#555",
        }}
      />
      <Stack.Screen
        name="DiabeticTypeScreen"
        component={DiabeticTypeScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#555",
        }}
      />
      <Stack.Screen
        name="MedicationScreen"
        component={MedicationScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#555",
        }}
      />
      <Stack.Screen
        name="MedicineListScreen"
        component={MedicineListScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#555",
        }}
      />
      <Stack.Screen
        name="BslRangeScreen"
        component={BslRangeScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#555",
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
