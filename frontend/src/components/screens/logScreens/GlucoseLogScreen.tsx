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
} from "@gluestack-ui/themed";
import React, { useRef, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Animated, Modal, Platform, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import GlucoFitFaceSample from "../../../../assets/GlucoFit-Face-sample.png";
import PickerOpenerRow from "../../molcules/PickerOpenerRow";
import SheetHandmade from "../../organisms/SheetHandmade";
import { AppStackParamList } from "../../../types/navigation";

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
    $user_id: ID!
    $bsl: Float!
    $note: NoteInput!
    $log_timestamp: Date!
    $confirmed: Boolean!
  ) {
    createTestResult(
      user_id: $user_id
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
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [timePeriod, setTimePeriod] = useState("");
  const timePeriods = ["After breakfast", "After lunch", "After dinner"];
  const [note, setNote] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isTimePeriodPickerOpen, setIsTimePeriodPickerOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const navigation = useNavigation<GlucoseLogScreenNavigationProps>();

  const [
    createTestResult,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_TEST_RESULT);

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

  const handleSubmitCreate = async () => {
    try {
      const combinedDateTime = new Date(date);
      combinedDateTime.setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      );

      const result = await createTestResult({
        variables: {
          user_id: "60d8f33e7f3f83479cbf5b4f", // hardcode for now
          bsl: Number(glucoseLevel),
          note: {
            note_description: note,
          },
          log_timestamp: combinedDateTime,
          confirmed: true,
        },
      });
      console.log("Mutation result:", result);
      navigation.navigate("Tabs", { screen: "Home" });
    } catch (e) {
      console.error("Error creating test result:", e);
    }
  };

  const handleSubmitUpdate = async () => {
    try {
      const result = await updateTestResult({
        variables: {
          updateTestResultId: "6700bdd5049f25c81a7787b2", // result doc id hardcode for now
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

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const showSheet = (sheetType: "timePeriod" | "note") => {
    sheetType === "timePeriod" && setIsTimePeriodPickerOpen(true);
    sheetType === "note" && setIsNoteOpen(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      // Animated.spring(translateY, {
      //   toValue: 0,
      //   tension: 65,
      //   friction: 11,
      //   useNativeDriver: true,
      // }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        // easing: Animated.Easing.Out(Animated.Easing.Cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = (sheetType: "timePeriod" | "note") => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
      // Animated.spring(translateY, {
      //   toValue: 0,
      //   tension: 65,
      //   friction: 11,
      //   useNativeDriver: true,
      // }),
    ]).start(() => {
      sheetType === "timePeriod" && setIsTimePeriodPickerOpen(false);
      sheetType === "note" && setIsNoteOpen(false);
    });
  };

  return (
    <VStack>
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
          setShowPicker={() => showSheet("timePeriod")}
          text="Time Period"
          value={timePeriod}
        />
      </VStack>

      <VStack
        space="sm"
        mt="$8"
        borderWidth={1}
        borderColor="$borderLight200"
        borderRadius="$md"
      >
        <HStack alignItems="center" justifyContent="space-between" p="$3">
          <Text fontSize="$lg" fontWeight="$bold">
            Add Notes
          </Text>
          <Pressable onPress={() => showSheet("note")}>
            <Icon as={AddIcon} size="sm" mr="$2" />
          </Pressable>
        </HStack>
        <Pressable
          onPress={() => {}}
          borderTopWidth={1}
          borderTopColor="$borderLight200"
        >
          <HStack alignItems="center" p="$3">
            <Text color="$textLight400">{note || "No notes to display"}</Text>
          </HStack>
        </Pressable>
      </VStack>

      <FormControl>
        <Button
          mt="$8"
          onPress={handleSubmitCreate}
          isDisabled={!(glucoseLevel && date && time && timePeriod)}
        >
          <ButtonText>Save</ButtonText>
        </Button>
      </FormControl>

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

      <SheetHandmade
        isSheetOpen={isTimePeriodPickerOpen}
        closeSheet={() => closeSheet("timePeriod")}
        setValue={setTimePeriod}
        translateY={translateY}
        sheetContentType="picker"
        optionsArray={timePeriods}
      />

      <SheetHandmade
        isSheetOpen={isNoteOpen}
        closeSheet={() => closeSheet("note")}
        setValue={setNote}
        translateY={translateY}
        sheetContentType="note"
        value={note}
      />
    </VStack>
  );
};

export default GlucoseLogScreen;
