import React, { useState } from "react";
import { View } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import PressableOption from "../../atoms/PressableOption";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const MedicationScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  const handleNext = () => {
    if (selectedOption === "yes") {
      navigation.navigate("MedicineListScreen");
    } else {
      navigation.navigate("BslRangeScreen");
    }
  };
  return (
    <View>
      <OnbordingLayout
        comment="Are you taking any medication to manage your condition?"
        progressValue={50}
        onPress={handleNext}
        disabled={selectedOption ? false : true}
      >
        <View flexDirection="column" gap={16}>
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="yes"
            label="Yes, I’m on medication"
          />
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="no"
            label="No, I currently don't"
          />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default MedicationScreen;
