import React, { useState } from "react";
import { View, HStack } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import { useOnboarding } from "../../../context/OnboardingContext";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";
import TimeInput from "../../atoms/TimeInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateInput from "../../atoms/DateInput";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const NameBdScreen: React.FC<Props> = ({ navigation }) => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [name, setName] = useState<string | undefined>(
    onboardingData.name || undefined
  );
  const [birthday, setBirthday] = useState<Date | undefined>(
    onboardingData.birthday || undefined
  );

  console.log(birthday);

  const handleNext = () => {
    updateOnboardingData({ name, birthday });
    console.log(onboardingData);
    navigation.navigate("HightWeightScreen");
  };
  return (
    <View>
      <OnbordingLayout
        comment="let’s start with your personal details for smarter insights"
        supplimentalComment="Your personal information will help us tailor insights to better support your health journey."
        progressValue={12.5}
        onPress={handleNext}
        character
        disabled={name && name.length > 0 ? false : true}
      >
        <View flexDirection="column" gap={12}>
          <HStack>
            <InputFieldGeneral
              label="Name"
              value={name}
              onChangeText={setName}
              isRequired={true}
              isDisabled={false}
              isInvalid={false}
              placeholder="Preferred Name"
            />
          </HStack>
          <DateInput
            labelText="Birthday"
            onChange={setBirthday}
            value={birthday}
            placeHolder="MM / DD / YYYY"
          />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default NameBdScreen;
