import React, { useState } from "react";
import { View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import PressableOption from "../../atoms/PressableOption";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const ConnectIhelathScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <View>
      <OnbordingLayout
        comment="Let’s start with your personal details for smarter insights"
        supplimentalComment="Your personal information will help us tailor insights to better support your health journey."
        progressValue={87.5}
        onPress={() => navigation.navigate("AllDoneScreen")}
      >
        <View flexDirection="column" gap={8}>
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="yes"
            label="Yes, I own an iHealth device"
          />
          <PressableOption
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
            value="no"
            label="No, I don’t own an iHealth device"
          />
        </View>
        <Button
          bgColor="white"
          borderWidth={1}
          borderColor="blue"
          isDisabled={selectedOption !== "yes"}
          mt={16}
        >
          <ButtonText color="black">+ Add device</ButtonText>
        </Button>
      </OnbordingLayout>
    </View>
  );
};

export default ConnectIhelathScreen;
