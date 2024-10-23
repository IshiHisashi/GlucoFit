import React, { useState } from "react";
import { View, Text, Pressable } from "@gluestack-ui/themed";
import OnbordingLayout from "../../organisms/OnboardingLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../types/navigation";
import Input from "../../atoms/onboarding/input";

type Props = NativeStackScreenProps<OnboardingStackParamList>;

const options = [
  { value: "mcg", label: "mcg" },
  { value: "g", label: "g" },
  { value: "mg", label: "mg" },
  { value: "mL", label: "mL" },
  { value: "%", label: "%" },
];

const MedicineListScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <View>
      <OnbordingLayout
        comment="Let’s add your medicine!"
        progressValue={62.5}
        onPress={() => navigation.navigate("BslRangeScreen")}
        addLater
      >
        {/*  */}
        <View width="100%" flexDirection="row" gap={16}>
          <View flexGrow={1} flexBasis="0%">
            <Input labelText="Height" />
          </View>
          <View flexGrow={1} flexBasis="0%">
            <Input labelText="Weight" />
          </View>
        </View>
        {/*  */}
        <View flexDirection="column" gap={8}>
          <Text fontSize={14} fontWeight={700}>
            Unit
          </Text>
          <View flexDirection="row" justifyContent="space-between">
            {options.map((option) => (
              <Pressable
                width={60}
                py={10}
                borderWidth={1}
                borderColor={selectedOption === option.value ? "blue" : "gray"}
                backgroundColor={
                  selectedOption === option.value ? "blue" : "white"
                }
                borderRadius={8}
                onPress={() => handleSelectOption(option.value)}
              >
                <Text
                  color={selectedOption === option.value ? "white" : "black"}
                  textAlign="center"
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        {/*  */}
        <Input labelText="Time" />
        {/*  */}
        <View flexDirection="row" justifyContent="space-between">
          <Text>+ Add more</Text>
          <Text>Save</Text>
        </View>
      </OnbordingLayout>
    </View>
  );
};

export default MedicineListScreen;
