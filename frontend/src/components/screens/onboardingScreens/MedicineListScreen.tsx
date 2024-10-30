import React, { useState } from "react";
import { View } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import Input from "../../atoms/onboarding/input";
import { useOnboarding } from "../../../context/OnboardingContext";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const MedicineListScreen: React.FC<Props> = ({ navigation }) => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [medicineName, setMedicineName] = useState<string | undefined>(
    onboardingData?.medicine_name
  );
  const [medicineTime, setMedicintTime] = useState<Date | undefined>(
    onboardingData.log_timestamp
  );

  const handleNext = () => {
    updateOnboardingData({
      medicine_name: medicineName,
      log_timestamp: medicineTime,
    });
    navigation.navigate("BslRangeScreen");
  };
  return (
    <View>
      <OnbordingLayout
        comment="Can you tell me more about your medication?"
        supplimentalComment="You can always add or update your prescription details later in your account profile"
        progressValue={62.5}
        onPress={handleNext}
        character
      >
        <View width="100%" flexDirection="column" gap={16}>
          <Input labelText="Medicine Name" onChange={setMedicineName} />
          <Input labelText="Time" onChange={setMedicintTime} />
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default MedicineListScreen;

// EX ---will be deleted----
{
  /* <OnbordingLayout
        comment="Can you tell me more about your medication?"
        progressValue={62.5}
        onPress={() => navigation.navigate("BslRangeScreen")}
        addLater
      >
        {/*  */
}
//   <View width="100%" flexDirection="row" gap={16}>
//     <View flexGrow={1} flexBasis="0%">
//       <Input labelText="Height" />
//     </View>
//     <View flexGrow={1} flexBasis="0%">
//       <Input labelText="Weight" />
//     </View>
//   </View>
//   {/*  */}
//   <View flexDirection="column" gap={8}>
//     <Text fontSize={14} fontWeight={700}>
//       Unit
//     </Text>
//     <View flexDirection="row" justifyContent="space-between">
//       {options.map((option) => (
//         <Pressable
//           width={60}
//           py={10}
//           borderWidth={1}
//           borderColor={selectedOption === option.value ? "blue" : "gray"}
//           backgroundColor={
//             selectedOption === option.value ? "blue" : "white"
//           }
//           borderRadius={8}
//           onPress={() => handleSelectOption(option.value)}
//         >
//           <Text
//             color={selectedOption === option.value ? "white" : "black"}
//             textAlign="center"
//           >
//             {option.label}
//           </Text>
//         </Pressable>
//       ))}
//     </View>
//   </View>
//   {/*  */}
//   <Input labelText="Time" />
//   {/*  */}
//   <View flexDirection="row" justifyContent="space-between">
//     <Text>+ Add more</Text>
//     <Text>Save</Text>
//   </View>
// </OnbordingLayout> */}
