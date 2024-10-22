import React from "react";
import {
  Text,
  View,
  Button,
  ButtonText,
  Image,
  Center,
} from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const OnboardingTitleScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <>
      <View
        flexDirection="column"
        gap={4}
        justifyContent="space-between"
        h="100%"
        p={16}
      >
        <Text textAlign="center">glucofit</Text>
        <Image
          source={require("../../../../assets/OnbordingChar.png")}
          resizeMode="contain"
          mx="auto"
          alt="Character is winking during the onboarding process"
        />
        <View flexDirection="column" gap={30}>
          <Text textAlign="center">
            Let's start your journey to better diabetic management
          </Text>
          <Button
            bgColor="#888"
            onPress={() => navigation.navigate("NameBdScreen")}
          >
            <ButtonText>Continue</ButtonText>
          </Button>
        </View>
      </View>
    </>
  );
};

export default OnboardingTitleScreen;
