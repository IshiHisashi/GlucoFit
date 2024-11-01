import React, { useState } from "react";
import { View, HStack } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";
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
        comment={`Nice to meet you, ${onboardingData.name}! We would like to know more about you.`}
        progressValue={25}
        onPress={handleNext}
      >
        <View flexDirection="column" gap={12}>
          <HStack>
            <InputFieldGeneral
              label="Height"
              value={height}
              onChangeText={handleHeightChange}
              isRequired={false}
              isDisabled={false}
              isInvalid={false}
              unit="cm."
            />
          </HStack>
          <HStack>
            <InputFieldGeneral
              label="Weight"
              value={weight}
              onChangeText={handleWeightChange}
              isRequired={false}
              isDisabled={false}
              isInvalid={false}
              unit="kls."
            />
          </HStack>
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default HightWeightScreen;
