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

// dummy data
const medicines = [
  { name: "Apotokishin", dosage: "16mg", frequency: "Everyday" },
  { name: "Kakkonto", dosage: "16mg", frequency: "Everyday" },
  { name: "Advil", dosage: "16mg", frequency: "Everyday" },
  { name: "Advil2", dosage: "16mg", frequency: "Everyday" },
  { name: "Advil3", dosage: "16mg", frequency: "Everyday" },
  { name: "Advil4", dosage: "16mg", frequency: "Everyday" },
  { name: "Advil5", dosage: "16mg", frequency: "Everyday" },
  { name: "Advil6", dosage: "16mg", frequency: "Everyday" },
  { name: "Advil7", dosage: "16mg", frequency: "Everyday" },
];

type MedicineLogScreenProps = NativeStackNavigationProp<
  AppStackParamList,
  "MedicineLog"
>;

const MedicineLogScreen: React.FC = () => {
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);

  const navigation = useNavigation<MedicineLogScreenProps>();

  const toggleMedSelection = (name: string) => {
    setSelectedMeds((prev) => {
      return prev.includes(name)
        ? prev.filter((el) => el !== name)
        : [...prev, name];
    });
  };

  const handleSave = () => {
    console.log(selectedMeds);
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
            medicines.map((obj) => (
              <ListCard
                text={obj.name}
                isSelected={selectedMeds.includes(obj.name)}
                iconLeft={CalendarDaysIcon}
                iconRightOn={CalendarDaysIcon}
                iconRightOff={SunIcon}
                badge={[obj.dosage, obj.frequency]}
                onPressIconRight={() => toggleMedSelection(obj.name)}
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
