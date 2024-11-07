import { View, VStack } from "@gluestack-ui/themed";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppStackParamList } from "../../../types/navigation";
import Sheet from "../../organisms/Sheet";
import ButtonFixedBottom from "../../molcules/ButtonFixedBottom";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import LogsTable from "../../organisms/LogsTable";
import { AuthContext } from "../../../context/AuthContext";

const CREATE_CARBS_LOG = gql`
  mutation CreateCarbsLog(
    $userId: String!
    $timePeriod: String!
    $carbs: Float!
    $logTimestamp: Date!
    $note: NoteInput
  ) {
    createDietLog(
      userID: $userId
      time_period: $timePeriod
      carbs: $carbs
      log_timestamp: $logTimestamp
      note: $note
    ) {
      id
      time_period
      note {
        note_title
        note_description
      }
      carbs
      log_timestamp
    }
  }
`;

const GET_CARBS_LOG = gql`
  query GetDietLog($getDietLogId: ID!) {
    getDietLog(id: $getDietLogId) {
      carbs
      id
      log_timestamp
      note {
        note_title
        note_description
      }
      time_period
    }
  }
`;

const UPDATE_CARBS_LOG = gql`
  mutation UpdateDietLog(
    $updateDietLogId: ID!
    $timePeriod: String
    $note: NoteInput
    $carbs: Float
  ) {
    updateDietLog(
      id: $updateDietLogId
      time_period: $timePeriod
      note: $note
      carbs: $carbs
    ) {
      carbs
      id
      log_timestamp
      note {
        note_title
        note_description
      }
      time_period
    }
  }
`;

type RouteParams = {
  logId?: string;
};

type CarbsLogScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "CarbsLog"
>;

const CarbsLogScreen: React.FC = () => {
  const navigation = useNavigation<CarbsLogScreenNavigationProps>();

  const route = useRoute<{ key: string; name: string; params: RouteParams }>();
  console.log("ROUTE ON CARBS LOG:", route.params?.logId);
  const logId = route.params?.logId;
  const { userId } = useContext(AuthContext);

  const [mealType, setMealType] = useState("");
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Others"];
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

  const { data: existingLogData, loading: queryLoading } = useQuery(
    GET_CARBS_LOG,
    {
      variables: { getDietLogId: logId },
      skip: !logId,
    }
  );

  const [createCarbsLog] = useMutation(CREATE_CARBS_LOG);
  const [updateCarbsLog] = useMutation(UPDATE_CARBS_LOG);

  useEffect(() => {
    if (existingLogData?.getDietLog) {
      const log = existingLogData.getDietLog;
      const logDate = new Date(log.log_timestamp);

      setMealType(log.time_period);
      setCarbs(log.carbs.toString());
      setDate(logDate);
      setTime(logDate);

      // Set note if it exists
      if (log.note) {
        setNote({
          title: log.note.note_title || "",
          content: log.note.note_description || "",
        });
      }
    }
  }, [existingLogData]);

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

      if (logId) {
        const result = await updateCarbsLog({
          variables: {
            updateDietLogId: logId,
            timePeriod: mealType,
            carbs: Number(carbs),
            // logTimestamp: combinedDateTime,
            note: {
              note_title: note.title,
              note_description: note.content,
            },
          },
        });
        console.log("Update result:", result);
      } else {
        const log = await createCarbsLog({
          variables: {
            userId: userId,
            carbs: Number(carbs),
            logTimestamp: combinedDateTime,
            note: {
              note_title: note.title,
              note_description: note.content,
            },
            timePeriod: mealType,
          },
        });
        console.log("Create result:", log);
      }
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
    {
      setShowPicker: setIsDatePickerOpen,
      text: "Date",
      value: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    },
    {
      setShowPicker: setIsTimePickerOpen,
      text: "Time",
      value: time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    },
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
