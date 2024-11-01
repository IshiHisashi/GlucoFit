import React, { useState } from "react";
import { View } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import Input from "../../atoms/onboarding/input";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import { useOnboarding } from "../../../context/OnboardingContext";
import InputFieldGeneralOnb from "../../atoms/InputField_Onb";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const NameBdScreen: React.FC<Props> = ({ navigation }) => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [name, setName] = useState<string | undefined>(
    onboardingData.name || ""
  );
  const [birthday, setBirthday] = useState<Date | undefined>(
    onboardingData.birthday || ""
  );

  const handleNext = () => {
    updateOnboardingData({ name, birthday });
    console.log(onboardingData);
    navigation.navigate("HightWeightScreen");
  };
  return (
    <View>
      <OnbordingLayout
        comment="Let’s start with your personal details for smarter insights"
        supplimentalComment="Your personal information will help us tailor insights to better support your health journey."
        progressValue={12.5}
        onPress={handleNext}
        character
      >
        <View width="100%" flexDirection="column" gap={16}>
          <InputFieldGeneralOnb
            isRequired
            isDisabled={false}
            isInvalid={false}
            value={name}
            onChangeText={setName}
            label="Name"
          />
          <InputFieldGeneralOnb
            isRequired
            isDisabled={false}
            isInvalid={false}
            value={name}
            onChangeText={setName}
            label="Name"
          />
          {/* <Input labelText="Name" onChange={setName} /> */}
          {/* <Input labelText="Birthday" onChange={setBirthday} /> */}
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default NameBdScreen;
