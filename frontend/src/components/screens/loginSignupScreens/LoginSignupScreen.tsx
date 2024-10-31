import React, { useContext } from "react";
import { View, Text, Button, ButtonText, Image } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { LoginSignupStackParamList } from "../../../types/navigation";
import { AuthContext } from "../../../context/AuthContext";

type Props = NativeStackScreenProps<LoginSignupStackParamList>;

const LoginSignupScreen: React.FC<Props> = ({ navigation }) => {
  const { SignOut } = useContext(AuthContext);

  return (
    <View flexDirection="column" gap={50} p={16}>
      <View marginTop={200} flexDirection="column" gap={10}>
        <Image
          source={require("../../../../assets/OnbordingChar.png")}
          resizeMode="contain"
          mx="auto"
          alt="Character is winking during the onboarding process"
        />
        <Image
          source={require("../../../../assets/logo_onbording.png")}
          resizeMode="contain"
          w={238}
          mx="auto"
          alt="Character is winking during the onboarding process"
        />
      </View>
      {/* btn section */}
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
