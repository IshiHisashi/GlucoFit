import React, { useState } from "react";
import { View, Button, ButtonText } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import PressableOption from "../../atoms/PressableOption";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const NotificationConfigScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <View>
      <OnbordingLayout
        comment="Stay on Track! Would you like reminders for logging?"
        progressValue={87.5}
        onPress={() => navigation.navigate("AllDoneScreen")}
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
