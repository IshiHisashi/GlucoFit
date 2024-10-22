import React, { useState } from "react";
import { View, Text } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const BslRangeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <View>
      <OnbordingLayout
        comment="Let’s start with your personal details for smarter insights"
        supplimentalComment="Your personal information will help us tailor insights to better support your health journey."
        onPress={() => navigation.navigate("ConnectIhelathScreen")}
      >
        <Text textAlign="center">Dual-slider will be here...</Text>
      </OnbordingLayout>
    </View>
  );
};

export default BslRangeScreen;
