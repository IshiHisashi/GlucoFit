import React, { useState } from "react";
import { View } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import PressableOption from "../../atoms/PressableOption";
import { useOnboarding } from "../../../context/OnboardingContext";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const DiabeticTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    onboardingData?.diabates_type
  );

  const handleSelectOption = (option: string) => {
    const numericValue = parseInt(option);
    setSelectedOption(numericValue);
  };

  const hanldleNext = () => {
    updateOnboardingData({ diabates_type: selectedOption });
    navigation.navigate("MedicationScreen");
  };
  return (
    <View>
      <OnbordingLayout
        comment="Are you diagnosed with Type 2 Diabetes or Prediabetes?"
        supplimentalComment="The app targets Type 2 and prediabetes only, as Type 1 requires different care approach."
        progressValue={37.5}
        onPress={hanldleNext}
        character
      >
        <View flexDirection="column" gap={16}>
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="2"
            label="Yes, I am a Type 2 Diabetic"
          />
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="1"
            label="Yes, I am Prediabetic"
          />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default DiabeticTypeScreen;
