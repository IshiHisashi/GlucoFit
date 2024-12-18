import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSignupScreen from "../screens/loginSignupScreens/LoginSignupScreen";
import LoginScreen from "../screens/loginSignupScreens/LoginScreen";
import SignupScreen from "../screens/loginSignupScreens/SignupScreen";
import OnboardingStack from "./OnboardingStack";
import type { LoginSignupStackParamList } from "../../types/navigation";

const Stack = createNativeStackNavigator<LoginSignupStackParamList>();

const LoginSignupStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginSignup"
        component={LoginSignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OnboardingStack"
        component={OnboardingStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginSignupStack;
