import React, { useState } from "react";
import { View } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import Input from "../../atoms/onboarding/input";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import { useOnboarding } from "../../../context/OnboardingContext";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const HightWeightScreen: React.FC<Props> = ({ navigation }) => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [height, setHeight] = useState<number | undefined>(
    onboardingData?.height
  );
  const [weight, setWeight] = useState<number | undefined>(
    onboardingData?.weight
  );
  const handleNext = () => {
    updateOnboardingData({ height, weight });
    navigation.navigate("DiabeticTypeScreen");
  };

  const handleHeightChange = (text: string) => {
    const numericValue = parseFloat(text);
    setHeight(isNaN(numericValue) ? undefined : numericValue);
  };

  const handleWeightChange = (text: string) => {
    const numericValue = parseFloat(text);
    setWeight(isNaN(numericValue) ? undefined : numericValue);
  };

  return (
    <View>
      <OnbordingLayout
        comment="Nice to meet you, Angie! We would like to know more about you."
        progressValue={25}
        onPress={handleNext}
      >
        <View width="100%" flexDirection="column" gap={16}>
          <Input labelText="Height" onChange={handleHeightChange} />
          <Input labelText="Weight" onChange={handleWeightChange} />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default HightWeightScreen;
