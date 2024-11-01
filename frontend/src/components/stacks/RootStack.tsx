import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../../context/AuthContext";

const RootStack = () => {
  const { userToken, hasCompletedOnboarding } = useContext(AuthContext);
  console.log(
    "hasCompletetonboarind that rootstack recognizes " + hasCompletedOnboarding
  );

  return (
    <NavigationContainer>
      {userToken && hasCompletedOnboarding ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;
