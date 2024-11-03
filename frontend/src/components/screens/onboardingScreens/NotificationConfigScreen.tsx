import React, { useState } from "react";
import { View } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import PressableOption from "../../atoms/PressableOption";
import { useOnboarding } from "../../../context/OnboardingContext";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const NotificationConfigScreen: React.FC<Props> = ({ navigation }) => {
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    onboardingData?.notification ? "yes" : "no"
  );

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const notification = selectedOption === "yes";
    updateOnboardingData({ notification });
    navigation.navigate("AllDoneScreen");
  };

  return (
    <View>
      <OnbordingLayout
        comment="Stay on Track! Would you like reminders for logging?"
        progressValue={87.5}
        onPress={handleNext}
        disabled={false}
      >
        <View flexDirection="column" gap={16}>
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="yes"
            label="Turn on notifications"
          />
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="no"
            label="Maybe later"
          />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default NotificationConfigScreen;
