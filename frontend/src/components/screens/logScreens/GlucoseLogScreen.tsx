import { Image, VStack, View, ScrollView } from "@gluestack-ui/themed";
import React, { useContext, useEffect, useRef, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import GlucoFitFaceSample from "../../../../assets/GlucoFit-Face-sample.png";
import { AppStackParamList } from "../../../types/navigation";
import ButtonFixedBottom from "../../molcules/ButtonFixedBottom";
import Sheet from "../../organisms/Sheet";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import InputFieldForBsl from "../../atoms/InputFieldForBsl";
import LogsTable from "../../organisms/LogsTable";
import { AuthContext } from "../../../context/AuthContext";

const CREATE_TEST_RESULT_WITH_INSIGHTS = gql`
  mutation Mutation(
    $userId: ID!
    $bsl: Float!
    $note: NoteInput
    $logTimestamp: Date
    $timePeriod: String
    $confirmed: Boolean
  ) {
    createTestResult(
      user_id: $userId
      bsl: $bsl
      note: $note
      log_timestamp: $logTimestamp
      time_period: $timePeriod
      confirmed: $confirmed
    ) {
      articlesToShow {
        article_name
        id
        diabetes_type
        article_url
        article_thumbnail_address
        article_genre
        article_desc
      }
      badgesToShow {
        badge_desc
        badge_name
        badge_image_address
        id
      }
    }
  }
`;

const GET_TEST_RESULTS = gql`
  query GetTestResult($getTestResultId: ID!) {
    getTestResult(id: $getTestResultId) {
      bsl
      id
      log_timestamp
      note {
        note_title
        # note_description
        # when activating note_description, error occurs.
      }
      time_period
    }
  }
`;

const UPDATE_TEST_RESULT = gql`
  mutation UpdateTestResult(
    $updateTestResultId: ID!
    $bsl: Float
    $note: NoteInput
    $logTimestamp: Date
    $timePeriod: String
  ) {
    updateTestResult(
      id: $updateTestResultId
      bsl: $bsl
      note: $note
      log_timestamp: $logTimestamp
      time_period: $timePeriod
    ) {
      bsl
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

type GlucoseLogScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "GlucoseLog"
>;

type RouteParams = {
  logId?: string;
};

const GlucoseLogScreen: React.FC = () => {
  const navigation = useNavigation<GlucoseLogScreenNavigationProps>();
  const route = useRoute<{ key: string; name: string; params: RouteParams }>();
  console.log("ROUTE ON GLUCO LOG:", route.params?.logId);
  const logId = route.params?.logId;
  const { userId } = useContext(AuthContext);

  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [timePeriod, setTimePeriod] = useState("");
  const timePeriods = ["After breakfast", "After lunch", "After dinner"];
  const [note, setNote] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isTimePeriodPickerOpen, setIsTimePeriodPickerOpen] = useState(false);

  // GMT
  console.log(date);
  console.log(new Date().toLocaleString());

  const { data: existingLogData, loading: queryLoading } = useQuery(
    GET_TEST_RESULTS,
    {
      variables: { getTestResultId: logId },
      skip: !logId,
    }
  );

  const [createTestResult] = useMutation(CREATE_TEST_RESULT_WITH_INSIGHTS);
  const [updateTestResult] = useMutation(UPDATE_TEST_RESULT);

  useEffect(() => {
    if (existingLogData?.getTestResult) {
      const log = existingLogData.getTestResult;
      const logDate = new Date(log.log_timestamp);

      setGlucoseLevel(log.bsl.toString());
      setTimePeriod(log.time_period);
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

  const onChangeDate = (selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setIsDatePickerOpen(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeTime = (selectedTime: Date) => {
    const currentTime = selectedTime || time;
    setIsTimePickerOpen(Platform.OS === "ios");
    setTime(currentTime);
  };

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

  const handleSubmitCreate = async () => {
    try {
      console.log(date);
      const combinedDateTime = new Date(date);
      console.log(combinedDateTime);
      combinedDateTime.setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      );
      console.log("date being sent:", combinedDateTime);

      if (logId) {
        const result = await updateTestResult({
          variables: {
            updateTestResultId: logId,
            bsl: Number(glucoseLevel),
            timePeriod: timePeriod,
            logTimestamp: combinedDateTime,
            note: {
              note_title: note.title,
              note_description: note.content,
            },
          },
        });
        console.log("Update result:", result);
        navigation.navigate("Tabs", {
          screen: "Home",
          params: { mutatedLog: "bsl" },
        });
      } else {
        const result = await createTestResult({
          variables: {
            userId: userId,
            logTimestamp: combinedDateTime,
            timePeriod: timePeriod,
            bsl: Number(glucoseLevel),
            note: {
              note_description: note.content,
              note_title: note.title,
            },
            confirmed: true,
          },
        });
        console.log("Create result:", result.data.createTestResult);
        navigation.navigate("Tabs", {
          screen: "Home",
          params: {
            mutatedLog: "bsl",
            insight: result.data.createTestResult.articlesToShow[0],
            badges: result.data.createTestResult.badgesToShow,
          },
        });
      }
    } catch (e) {
      console.error("Error creating test result:", e);
    }
  };

  // const { loading, error, data } = useQuery(GET_TEST_RESULTS);
  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
  // console.log(data);

  const pickerData = [
    { setShowPicker: setIsDatePickerOpen, text: "Date", value: date },
    { setShowPicker: setIsTimePickerOpen, text: "Time", value: time },
    {
      setShowPicker: setIsTimePeriodPickerOpen,
      text: "Time Period",
      value: timePeriod,
    },
  ];

  return (
    <SafeAreaView>
      <View height="$full">
        <ScrollView>
          <HeaderWithBackButton
            navigation={navigation}
            text="Add Blood Glucose"
            // rightIconOnPress={() => {}}
          />
          {/* <VStack p="$4"> */}
          <VStack
            space="sm"
            alignItems="center"
            p="$4"
            py="$12"
            bg="$neutralWhite"
          >
            <Image source={GlucoFitFaceSample} alt="GlucoFit face" size="xl" />

            <InputFieldForBsl
              value={glucoseLevel}
              onChangeText={setGlucoseLevel}
              isDisabled={false}
            />
          </VStack>

          <VStack space="xl" p="$4" py="$10" bg="$neutralDark5">
            <LogsTable
              title="Schedule"
              pickerData={pickerData}
              tableType="pickers"
            />

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
          {/* </VStack> */}
          <View height="$16" />
        </ScrollView>

        <ButtonFixedBottom
          onPress={handleSubmitCreate}
          isDisabled={!(glucoseLevel && date && time && timePeriod)}
          text="Save"
        />

        {/* picker modals --------------------------------- */}

        <DateTimePickerModal
          isVisible={isDatePickerOpen}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setIsDatePickerOpen(false)}
          // testID="dateTimePicker"
          // date={date}
          // is24Hour={true}
          // display="default"
          // onChange={onChangeDate}
        />

        <DateTimePickerModal
          isVisible={isTimePickerOpen}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setIsTimePickerOpen(false)}
          // testID="dateTimePicker"
          // time={time}
          is24Hour={true}
          // display="default"
          // onChange={onChangeTime}
        />

        <Sheet
          isOpen={isTimePeriodPickerOpen}
          onClose={setIsTimePeriodPickerOpen}
          setValue={setTimePeriod}
          sheetContentType="picker"
          title="Time period"
          optionsArray={timePeriods}
          value={timePeriod}
        />
      </View>
    </SafeAreaView>
  );
};

export default GlucoseLogScreen;
