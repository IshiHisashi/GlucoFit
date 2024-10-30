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
        comment="Nice to meet you, Angie! We would like to know more about you."
        progressValue={25}
        onPress={() => navigation.navigate("DiabeticTypeScreen")}
      >
        <View width="100%" flexDirection="column" gap={16}>
          <Input labelText="Height" />
          <Input labelText="Weight" />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default HightWeightScreen;
