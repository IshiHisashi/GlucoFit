import { View, VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { gql, useMutation } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppStackParamList } from "../../../types/navigation";
import Sheet from "../../organisms/Sheet";
import ButtonFixedBottom from "../../molcules/ButtonFixedBottom";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import LogsTable from "../../organisms/LogsTable";

// hardcode for now
const userId = "670de7a6e96ff53059a49ba8";

const CREATE_CARBS_LOG = gql`
  mutation CreateCarbsLog(
    $userId: String!
    $carbs: Float!
    $logTimestamp: Date!
    $note: NoteInput
  ) {
    createDietLog(
      userID: $userId
      carbs: $carbs
      log_timestamp: $logTimestamp
      note: $note
    ) {
      log_timestamp
      carbs
      id
      note {
        note_title
        note_description
      }
    }
  }
`;

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

  const [createCarbsLog, { data, loading, error }] =
    useMutation(CREATE_CARBS_LOG);

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

  const handleSave = async () => {
    try {
      const combinedDateTime = new Date(date);
      combinedDateTime.setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      );
      const log = await createCarbsLog({
        variables: {
          userId: userId,
          carbs: Number(carbs),
          logTimestamp: combinedDateTime,
          note: {
            note_title: note.title,
            note_description: note.content,
          },
        },
      });
      console.log("Mutation result:", log);
      navigation.navigate("Tabs", {
        screen: "Home",
        params: { mutatedLog: "carb" },
      });
    } catch (error) {
      console.error("Error creating carbs log:", error);
    }
  };

  const pickerData = [
    {
      setShowPicker: setIsMealTypePickerOpen,
      text: "Time Period",
      value: mealType,
    },
    { setShowPicker: setIsDatePickerOpen, text: "Date", value: date },
    { setShowPicker: setIsTimePickerOpen, text: "Time", value: time },
    { onChangeText: setCarbs, text: "Carbs", value: carbs },
  ];

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Food"
          // rightIconOnPress={() => {}}
        />

        <VStack p="$4" pt="$8" space="xl">
          <LogsTable pickerData={pickerData} tableType="pickers" />

          <LogsTable
            title="Add Notes"
            onPressTitleRightButton={handleOpenNote}
            noteData={{
              noteExcerpt: note.title,
              onPressNote: handleOpenNote,
            }}
            tableType="notes"
          />
        </VStack>

        <ButtonFixedBottom
          onPress={handleSave}
          isDisabled={!(mealType && date && time && carbs)}
          text="Save"
        />

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
    </SafeAreaView>
  );
};

export default CarbsLogScreen;
