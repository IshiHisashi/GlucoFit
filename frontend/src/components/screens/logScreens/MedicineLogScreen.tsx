import {
  Button,
  ButtonText,
  CalendarDaysIcon,
  SunIcon,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import ListCard from "../../molcules/ListCard";

// dummy data
const medicines = [
  { name: "Apotokishin", dosage: "16mg", frequency: "Everyday" },
  { name: "Kakkonto", dosage: "16mg", frequency: "Everyday" },
];

const MedicineLogScreen: React.FC = () => {
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);

  const toggleMedSelection = (name: string) => {
    setSelectedMeds((prev) => {
      return prev.includes(name)
        ? prev.filter((el) => el !== name)
        : [...prev, name];
    });
  };

  const handleSave = () => {
    console.log(selectedMeds);
  };

  return (
    <ScrollView p="$4">
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

      <Button isDisabled={selectedMeds.length < 1} onPress={handleSave}>
        <ButtonText>Save</ButtonText>
      </Button>
    </ScrollView>
  );
};

export default MedicineLogScreen;
