import {
  Button,
  ButtonText,
  Center,
  ChevronRightIcon,
  Icon,
  Pressable,
  Text,
  View,
  VStack,
  Box,
  HStack,
  Input,
  InputField,
  InputSlot,
  AddIcon,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import PickerOpenerRow from "../../molcules/PickerOpenerRow";
import { AppStackParamList } from "../../../types/navigation";
import Sheet from "../../organisms/Sheet";

// hardcode for now
const userId = "60d8f33e7f3f83479cbf5b4f";

type CarbsLogScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "CarbsLog"
>;

const CarbsLogScreen: React.FC = () => {
  const navigation = useNavigation<CarbsLogScreenNavigationProps>();

  const [mealType, setMealType] = useState("");
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Other"];
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [carbs, setCarbs] = useState<string>("");
  const [note, setNote] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const [isMealTypePickerOpen, setIsMealTypePickerOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const handleDateConfirm = (date: Date) => {
    setDate(date);
    setIsDatePickerOpen(false);
  };

  const handleTimeConfirm = (time: Date) => {
    setTime(time);
    setIsTimePickerOpen(false);
  };

  const handleOpenNote = () => {
    navigation.navigate("Note", {
      initialNote: note,
      onSave: (updatedNote: { title: string; content: string }) => {
        setNote(updatedNote);
      },
    });
  };

  const handleCarbsInput = (input: string) => {
    if (input === "") {
      setCarbs("");
    } else {
      setCarbs(input.replace("-", ""));
    }
  };

  const handleSave = () => {
    navigation.navigate("Tabs", {
      screen: "Home",
      params: { mutatedLog: "carb" },
    });
  };

  return (
    <View height="$full" p="$4">
      <VStack
        space="sm"
        // mt="$8"
        borderWidth={1}
        borderColor="$borderLight200"
        borderRadius="$md"
      >
        <Pressable onPress={() => setIsMealTypePickerOpen(true)}>
          <HStack justifyContent="space-between" p="$3">
            <Text fontSize="$lg" fontWeight="$bold">
              {mealType || "Select meal type"}
            </Text>
            <Icon as={ChevronRightIcon} size="sm" />
          </HStack>
        </Pressable>

        <PickerOpenerRow
          setShowPicker={setIsDatePickerOpen}
          text="Date"
          value={date}
        />
        <PickerOpenerRow
          setShowPicker={setIsTimePickerOpen}
          text="Time"
          value={time}
        />

        <HStack
          justifyContent="space-between"
          alignItems="center"
          p="$3"
          borderColor="$borderLight200"
          borderTopWidth={1}
        >
          <Text>Carbs</Text>
          <Input variant="outline" size="md" w="$40">
            <InputField
              placeholder="---"
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="numeric"
              textAlign="right"
            />
            <InputSlot pr="$3">
              <Text>g</Text>
            </InputSlot>
          </Input>
        </HStack>
      </VStack>

      <VStack
        space="sm"
        mt="$4"
        borderWidth={1}
        borderColor="$borderLight200"
        borderRadius="$md"
      >
        <HStack alignItems="center" justifyContent="space-between" p="$3">
          <Text fontSize="$lg" fontWeight="$bold">
            Add Notes
          </Text>
          <Pressable onPress={handleOpenNote}>
            <Icon as={AddIcon} size="sm" mr="$2" />
          </Pressable>
        </HStack>
        <Pressable
          onPress={() => {}}
          borderTopWidth={1}
          borderTopColor="$borderLight200"
        >
          <HStack alignItems="center" p="$3">
            <Text color="$textLight400">
              {note.title || "No notes to display"}
            </Text>
          </HStack>
        </Pressable>
      </VStack>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p="$4"
        pb="$8"
        bg="$white"
      >
        <Button
          isDisabled={!(mealType && date && time && carbs)}
          onPress={handleSave}
        >
          <ButtonText>Save</ButtonText>
        </Button>
      </Box>

      {/* picker modals --------------------------------- */}

      <Sheet
        isOpen={isMealTypePickerOpen}
        onClose={setIsMealTypePickerOpen}
        setValue={setMealType}
        sheetContentType="picker"
        title="Meal type"
        optionsArray={mealTypes}
        value={mealType}
      />

      <DateTimePickerModal
        isVisible={isDatePickerOpen}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setIsDatePickerOpen(false)}
      />

      <DateTimePickerModal
        isVisible={isTimePickerOpen}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setIsTimePickerOpen(false)}
        is24Hour={true}
      />
    </View>
  );
};

export default CarbsLogScreen;
