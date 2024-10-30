import React from "react";
import { Text, View, Button, ButtonText, Image } from "@gluestack-ui/themed";
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
        <View marginTop={103} flexDirection="column" gap={10}>
          <Image
            source={require("../../../../assets/OnbordingChar.png")}
            resizeMode="contain"
            mx="auto"
            alt="Character is winking during the onboarding process"
          />
          <Image
            source={require("../../../../assets/logo_onbording.png")}
            resizeMode="contain"
            w={288}
            mx="auto"
            alt="Character is winking during the onboarding process"
          />
        </View>
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
