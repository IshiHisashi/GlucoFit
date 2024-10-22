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
        comment="Let’s start with your personal details for smarter insights"
        supplimentalComment="Your personal information will help us tailor insights to better support your health journey."
        onPress={() => navigation.navigate("MedicineListScreen")}
      >
        <View flexDirection="column" gap={8}>
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="oral"
            label="Yes, I’m on oral medication"
          />
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="insulin"
            label="Yes, I’m on insulinc"
          />
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="both"
            label="Yes, I’m on both"
          />
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="Neither"
            label="Neither"
          />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default MedicationScreen;
