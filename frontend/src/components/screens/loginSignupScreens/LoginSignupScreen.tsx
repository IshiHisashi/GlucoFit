import React, { useContext } from "react";
import { View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { LoginSignupStackParamList } from "../../../types/navigation";
import { AuthContext } from "../../../context/AuthContext";

type Props = NativeStackScreenProps<LoginSignupStackParamList>;

const LoginSignupScreen: React.FC<Props> = ({ navigation }) => {
  const { SignOut } = useContext(AuthContext);

  return (
    <View flexDirection="column" gap={50} p={16}>
      <Text textAlign="center" fontSize={30} fontWeight={600}>
        GlucoFit
      </Text>
      <View w={250} h={250} backgroundColor="#888" alignSelf="center"></View>
      <View flexDirection="column" gap={8}>
        <Button bgColor="#888" onPress={() => navigation.navigate("Login")}>
          <ButtonText>Go to Login</ButtonText>
        </Button>
        <Button bgColor="#888" onPress={() => navigation.navigate("Signup")}>
          <ButtonText>Go to Sign up</ButtonText>
        </Button>
        <Button
          bgColor="#888"
          onPress={() => navigation.navigate("OnboardingStack")}
        >
          <ButtonText>Go to Onboarding</ButtonText>
        </Button>
        <Button bgColor="#888" onPress={SignOut}>
          <ButtonText>Sign Out</ButtonText>
        </Button>
      </View>
    </View>
  );
};

export default LoginSignupScreen;
