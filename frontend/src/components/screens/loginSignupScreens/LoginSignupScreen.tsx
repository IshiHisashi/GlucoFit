import React from "react";
import { View, Image } from "@gluestack-ui/themed";
import Lottie from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { LoginSignupStackParamList } from "../../../types/navigation";
import GlucoButton from "../../atoms/GlucoButton";
import LogoAnimation from "../../animations/logo-animation.json";

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
        <Lottie
          source={LogoAnimation}
          autoPlay
          loop
          style={{ width: 300, height: 300, margin: "auto" }}
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
