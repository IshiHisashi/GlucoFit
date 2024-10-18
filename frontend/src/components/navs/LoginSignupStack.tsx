import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSignupScreen from "../screens/loginSignupScreens/LoginSignupScreen";
import LoginScreen from "../screens/loginSignupScreens/LoginScreen";
import SignupScreen from "../screens/loginSignupScreens/SignupScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const LoginSignupStack: React.FC = () => {
  return;
  <Stack.Navigate>
    <Stack.Screen />
    <Stack.Screen />
    <Stack.Screen />
  </Stack.Navigate>;
};

export default LoginSignupStack;
