import React from "react";
import { View, Text } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import Input from "../../atoms/onboarding/input";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const HightWeightScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <OnbordingLayout
        comment="Let’s start with your personal details for smarter insights"
        supplimentalComment="Your personal information will help us tailor insights to better support your health journey."
        progressValue={25}
        onPress={() => navigation.navigate("DiabeticTypeScreen")}
      >
        <View width="100%" flexDirection="row" gap={16}>
          <View flexGrow={1} flexBasis="0%">
            <Input labelText="Height" />
          </View>
          <View flexGrow={1} flexBasis="0%">
            <Input labelText="Weight" />
          </View>
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default HightWeightScreen;
