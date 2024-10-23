import React from "react";
import { View, Text } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import Input from "../../atoms/onboarding/input";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const NameBdScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <OnbordingLayout
        comment="Let’s start with your personal details for smarter insights"
        supplimentalComment="Your personal information will help us tailor insights to better support your health journey."
        progressValue={12.5}
        onPress={() => navigation.navigate("HightWeightScreen")}
      >
        <View width="100%" flexDirection="column" gap={16}>
          <Input labelText="Name" />
          <Input labelText="Birthday" />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default NameBdScreen;
