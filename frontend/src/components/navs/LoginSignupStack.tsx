import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSignupScreen from "../screens/loginSignupScreens/LoginSignupScreen";
import LoginScreen from "../screens/loginSignupScreens/LoginScreen";
import SignupScreen from "../screens/loginSignupScreens/SignupScreen";
import type { LoginSignupStackParamList } from "../../types/navigation";

const Stack = createNativeStackNavigator<LoginSignupStackParamList>();

const LoginSignupStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
          headerBackTitleVisible: false,
          headerTintColor: "#555",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "Signup",
          headerBackTitleVisible: false,
          headerTintColor: "#555",
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginSignupStack;
