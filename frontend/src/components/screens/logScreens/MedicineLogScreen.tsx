import {
  Button,
  ButtonText,
  CalendarDaysIcon,
  SunIcon,
  ScrollView,
  Text,
  VStack,
  View,
  Box,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import ListCard from "../../molcules/ListCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { gql, useMutation } from "@apollo/client";

// hardcode for now
const userId = "60d8f33e7f3f83479cbf5b4f";

const CREATE_MEDICINE_LOG = gql`
  mutation CreateMedicineLog(
    $userId: ID!
    $amount: Float!
    $logTimestamp: Date!
  ) {
    createMedicineLog(
      user_id: $userId
      amount: $amount
      log_timestamp: $logTimestamp
    ) {
      amount
      id
      log_timestamp
    }
  }
`;

// dummy data
const medicines = [
  { name: "Apotokishin", dosage: 16, unit: "mg", frequency: "Everyday" },
  { name: "Kakkonto", dosage: 18, unit: "mg", frequency: "Everyday" },
];

type MedicineLogScreenProps = NativeStackNavigationProp<
  AppStackParamList,
  "MedicineLog"
>;

const MedicineLogScreen: React.FC = () => {
  const [selectedMeds, setSelectedMeds] = useState<
    [{ name: string; dosage: number }]
  >([]);

  const navigation = useNavigation<MedicineLogScreenProps>();

  const [createMedicineLog, { data, loading, error }] =
    useMutation(CREATE_MEDICINE_LOG);

  const toggleMedSelection = (name: string, dosage: number) => {
    setSelectedMeds((prev) => {
      const isSelected = prev.some((med) => med.name === name);
      if (isSelected) {
        return prev.filter((med) => med.name !== name);
      } else {
        return [...prev, { name, dosage }];
      }
    });
  };

  const handleSave = async () => {
    console.log(selectedMeds);
    // const combinedDateTime = new Date(date);
    // combinedDateTime.setHours(
    //   time.getHours(),
    //   time.getMinutes(),
    //   time.getSeconds()
    // );

    for (const med of selectedMeds) {
      try {
        const log = await createMedicineLog({
          variables: {
            userId: userId,
            amount: med.dosage,
            logTimestamp: new Date(),
          },
        });
        console.log("Mutation result:", log);
      } catch (error) {
        console.error("Error creating medicine log:", error);
      }
    }

    navigation.navigate("Tabs", {
      screen: "Home",
      params: { mutatedLog: "medicine" },
    });
  };

  return (
    <View height="$full">
      <ScrollView p="$4" pb="$16">
        <VStack space="md">
          {medicines &&
            medicines.map((obj, index) => (
              <ListCard
                key={index}
                text={obj.name}
                isSelected={selectedMeds.some((med) => med.name === obj.name)}
                iconLeft={CalendarDaysIcon}
                iconRightOn={CalendarDaysIcon}
                iconRightOff={SunIcon}
                badge={[`${obj.dosage}${obj.unit}`, obj.frequency]}
                onPressIconRight={() =>
                  toggleMedSelection(obj.name, obj.dosage)
                }
              />
            ))}
        </VStack>
        <View h={120} />
      </ScrollView>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p="$4"
        pb="$8"
        bg="$white"
      >
        <Button isDisabled={selectedMeds.length < 1} onPress={handleSave}>
          <ButtonText>Save</ButtonText>
        </Button>
      </Box>
    </View>
  );
};

export default MedicineLogScreen;
