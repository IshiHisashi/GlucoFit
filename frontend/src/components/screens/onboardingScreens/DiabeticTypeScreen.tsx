import React, { useState } from "react";
import { View } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import PressableOption from "../../atoms/PressableOption";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const DiabeticTypeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <View>
      <OnbordingLayout
        comment="Are you diagnosed with Type 2 Diabetes or Prediabetes?"
        supplimentalComment="The app targets Type 2 and prediabetes only, as Type 1 requires different care approach."
        progressValue={37.5}
        onPress={() => navigation.navigate("MedicationScreen")}
        character
      >
        <View flexDirection="column" gap={16}>
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="Type2"
            label="Yes, I am a Type 2 Diabetic"
          />
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="Prediabetes"
            label="Yes, I am Prediabetic"
          />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default DiabeticTypeScreen;
