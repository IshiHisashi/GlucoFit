import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSignupScreen from "../screens/loginSignupScreens/LoginSignupScreen";
import SignupScreen from "../screens/loginSignupScreens/SignupScreen";
import LoginScreen from "../screens/loginSignupScreens/LoginScreen";
import OnboardingStack from "./OnboardingStack";
import { AuthContext } from "../../context/AuthContext";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { userToken, hasCompletedOnboarding } = useContext(AuthContext);
  console.log(
    "hasCompletedOnboarding that AuthStack recognizes",
    hasCompletedOnboarding
  );

  return (
    <Stack.Navigator
      initialRouteName={
        !hasCompletedOnboarding && userToken ? "OnboardingStack" : "LoginSignup"
      }
    >
      <Stack.Screen
        name="LoginSignup"
        component={LoginSignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnboardingStack"
        component={OnboardingStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
