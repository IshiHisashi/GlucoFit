import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSignupScreen from "../screens/loginSignupScreens/LoginSignupScreen";
import SignupScreen from "../screens/loginSignupScreens/SignupScreen";
import LoginScreen from "../screens/loginSignupScreens/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
