import React, { useContext } from "react";
import { View, Text, Image, HStack } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { LoginSignupStackParamList } from "../../../types/navigation";
import { AuthContext } from "../../../context/AuthContext";
import GlucoButton from "../../atoms/GlucoButton";

type Props = NativeStackScreenProps<LoginSignupStackParamList>;

const LoginSignupScreen: React.FC<Props> = ({ navigation }) => {
  const { SignOut } = useContext(AuthContext);

  return (
    <View
      flexDirection="column"
      justifyContent="space-between"
      gap={50}
      p={16}
      height="100%"
    >
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
      <View marginBottom={48} flexDirection="column" gap={16}>
        <GlucoButton
          buttonType="primary"
          text="Sign up"
          isFocused={false}
          isDisabled={false}
          onPress={() => navigation.navigate("Signup")}
        />
        <GlucoButton
          buttonType="secondary"
          text="Have an account? Sign in."
          isFocused={false}
          isDisabled={false}
          onPress={() => navigation.navigate("Login")}
        />
        {/* <HStack gap={16} justifyContent="center">
          <Text
            color="#888"
            onPress={() => navigation.navigate("OnboardingStack")}
          >
            Onboarding
          </Text>
          <Text color="#888" onPress={SignOut}>
            Sign Out
          </Text>
        </HStack> */}
      </View>
    </View>
  );
};

export default LoginSignupScreen;
