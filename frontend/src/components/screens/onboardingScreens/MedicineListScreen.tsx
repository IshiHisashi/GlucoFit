import React, { useState } from "react";
import { View, HStack } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";
import TimeInput from "../../atoms/TimeInput";
import { useOnboarding } from "../../../context/OnboardingContext";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const MedicineListScreen: React.FC<Props> = ({ navigation }) => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [medicineName, setMedicineName] = useState<string | undefined>(
    onboardingData?.medicine_name
  );
  const [medicineTime, setMedicineTime] = useState<Date | undefined>(
    onboardingData.log_timestamp
  );

  const handleNext = () => {
    updateOnboardingData({
      medicine_name: medicineName,
      log_timestamp: medicineTime,
    });
    navigation.navigate("BslRangeScreen");
  };

  console.log(medicineTime);

  return (
    <View>
      <OnbordingLayout
        comment="Can you tell me more about your medication?"
        supplimentalComment="You can always add or update your prescription details later in your account profile"
        progressValue={62.5}
        onPress={handleNext}
        character
        disabled={medicineName && medicineTime ? false : true}
      >
        <View width="100%" flexDirection="column" gap={16}>
          <HStack>
            <InputFieldGeneral
              label="Medicine Name"
              value={medicineName}
              onChangeText={setMedicineName}
              placeholder="Metformin"
              isRequired={true}
              isDisabled={false}
              isInvalid={false}
            />
          </HStack>
          <TimeInput
            labelText="Time"
            onChange={setMedicineTime}
            value={medicineTime}
            placeHolder="Add time"
            isRequired={true}
          />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default MedicineListScreen;
