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
  return (
    <View>
      <OnbordingLayout
        comment="Are you taking any medication to manage your condition?"
        progressValue={50}
        onPress={() => navigation.navigate("MedicineListScreen")}
      >
        <View flexDirection="column" gap={16}>
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="oral"
            label="Yes, I’m on medication"
          />
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="insulin"
            label="No, I currently don't"
          />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default MedicationScreen;
