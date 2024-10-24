import {
  ButtonText,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
  Button,
  InputSlot,
  AddIcon,
  View,
} from "@gluestack-ui/themed";
import React, { useRef, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import GlucoFitFaceSample from "../../../../assets/GlucoFit-Face-sample.png";
import PickerOpenerRow from "../../molcules/PickerOpenerRow";
import { AppStackParamList } from "../../../types/navigation";
import AddNotesSection from "../../organisms/AddNotesSection";
import ButtonFixedBottom from "../../molcules/ButtonFixedBottom";
import Sheet from "../../organisms/Sheet";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";

// hardcode for now
const userId = "670de7a6e96ff53059a49ba8";

const GET_TEST_RESULTS = gql`
  query GetTestResults {
    getTestResults {
      bsl
      confirmed
      id
      log_timestamp
      note {
        note_description
      }
    }
  }
`;

const CREATE_TEST_RESULT = gql`
  mutation CreateTestResult(
    $userId: ID!
    $bsl: Float!
    $note: NoteInput!
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
      bsl
      confirmed
      log_timestamp
      note {
        content
        note_description
        title
      }
      time_period
    }
  }
`;

const CREATE_TEST_RESULT_WITH_INSIGHTS = gql`
  mutation CreateTestResultWithInsights(
    $userId: ID!
    $bsl: Float!
    $note: NoteInput!
    $logTimestamp: Date
    $timePeriod: String
    $confirmed: Boolean
  ) {
    createTestResultWithInsights(
      user_id: $userId
      bsl: $bsl
      note: $note
      log_timestamp: $logTimestamp
      time_period: $timePeriod
      confirmed: $confirmed
    ) {
      article_genre
      article_name
      article_url
      id
    }
  }
`;

const UPDATE_TEST_RESULT = gql`
  mutation UpdateTestResult(
    $updateTestResultId: ID!
    $bsl: Float
    $note: NoteInput
    $log_timestamp: Date
    $confirmed: Boolean
  ) {
    updateTestResult(
      id: $updateTestResultId
      bsl: $bsl
      note: $note
      log_timestamp: $log_timestamp
      confirmed: $confirmed
    ) {
      id
      bsl
      note {
        note_description
      }
      log_timestamp
      confirmed
    }
  }
`;

type GlucoseLogScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "GlucoseLog"
>;

const GlucoseLogScreen: React.FC = () => {
  const navigation = useNavigation<GlucoseLogScreenNavigationProps>();

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
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  // GMT
  console.log(date);
  console.log(new Date().toLocaleString());

  const [
    createTestResult,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_TEST_RESULT_WITH_INSIGHTS);

  const [
    updateTestResult,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_TEST_RESULT);

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
      console.log("Mutation result:", result.data.createTestResultWithInsights);
      navigation.navigate("Tabs", {
        screen: "Home",
        params: {
          mutatedLog: "bsl",
          insight: result.data.createTestResultWithInsights[0],
        },
      });
    } catch (e) {
      console.error("Error creating test result:", e);
    }
  };

  const handleSubmitUpdate = async () => {
    try {
      const result = await updateTestResult({
        variables: {
          updateTestResultId: userId,
          bsl: 100,
          note: {
            note_description: "Updated!",
          },
          log_timestamp: new Date().toISOString(),
          confirmed: true,
        },
      });
      console.log("Update result:", result);
    } catch (error) {
      console.error("Error updating test result", error);
    }
  };

  // const { loading, error, data } = useQuery(GET_TEST_RESULTS);
  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
  // console.log(data);

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Add Blood Glucose"
          rightIconOnPress={() => {}}
        />
        <VStack p="$4">
          <VStack space="sm" alignItems="center">
            <Image source={GlucoFitFaceSample} alt="GlucoFit face" size="xl" />

            <FormControl isRequired>
              <Input variant="outline" size="md" w="$56">
                <InputField
                  value={glucoseLevel}
                  onChangeText={setGlucoseLevel}
                  keyboardType="numeric"
                  // placeholder="Input your glucose level..."
                  // w="$full"
                  // textAlign="center"
                  fontSize="$2xl"
                />
                <InputSlot pr="$3">
                  <Text>mmol/L</Text>
                </InputSlot>
              </Input>
            </FormControl>
          </VStack>

          <VStack
            space="sm"
            mt="$8"
            borderWidth={1}
            borderColor="$borderLight200"
            borderRadius="$md"
          >
            <Text fontSize="$lg" fontWeight="$bold" p="$3">
              Schedule
            </Text>

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
            <PickerOpenerRow
              setShowPicker={setIsTimePeriodPickerOpen}
              text="Time Period"
              value={timePeriod}
            />
          </VStack>

          <AddNotesSection onPress={handleOpenNote} noteExcerpt={note.title} />
        </VStack>

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
