import React from "react";
import { View, Text, Image, HStack } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { LoginSignupStackParamList } from "../../../types/navigation";
import GlucoButton from "../../atoms/GlucoButton";

type Props = NativeStackScreenProps<LoginSignupStackParamList>;

const LoginSignupScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View
      flexDirection="column"
      justifyContent="space-between"
      gap={50}
      p={16}
      height="100%"
      backgroundColor="#4800FF"
    >
      <View marginTop={200} flexDirection="column" gap={10}>
        <Image
          source={require("../../../../assets/OnbordingChar.png")}
          resizeMode="contain"
          mx="auto"
          alt="Character is winking during the onboarding process"
        />
        <Image
          source={require("../../../../assets/app-name-white.png")}
          resizeMode="contain"
          w={238}
          mx="auto"
          alt="Character is winking during the onboarding process"
        />
      </View>
      {/* btn section */}
      <View marginBottom={48} flexDirection="column" gap={16}>
        <GlucoButton
          buttonType="secondary"
          text="Sign in"
          isFocused={false}
          isDisabled={false}
          onPress={() => navigation.navigate("Login")}
        />
        <GlucoButton
          buttonType="secondary"
          text="Create an account"
          isFocused={false}
          isDisabled={false}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </View>
  );
};

export default LoginSignupScreen;
