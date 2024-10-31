import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../../context/AuthContext";

const RootStack = () => {
  const { userToken } = useContext(AuthContext);
  console.log("Token is " + userToken);

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;
