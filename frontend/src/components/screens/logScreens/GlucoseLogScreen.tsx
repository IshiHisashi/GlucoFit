import {
  ButtonText,
  Center,
  ChevronRightIcon,
  FormControl,
  FormControlLabelText,
  HStack,
  Icon,
  Image,
  Input,
  InputField,
  InputIcon,
  Pressable,
  Text,
  VStack,
  Button,
  InputSlot,
  AddIcon,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { FormControlLabel } from "@gluestack-ui/themed";
import { Textarea } from "@gluestack-ui/themed";
import { TextareaInput } from "@gluestack-ui/themed";
// import { Button } from "@gluestack-ui/themed";
// import { InputSlot } from "@gluestack-ui/themed";
import { gql, useQuery, useMutation } from "@apollo/client";

import GlucoFitFaceSample from "../../../../assets/GlucoFit-Face-sample.png";
import PickerOpenerRow from "../../molcules/PickerOpenerRow";

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

const GlucoseLogScreen: React.FC = () => {
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  const [
    createTestResult,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_TEST_RESULT);

  const [
    updateTestResult,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_TEST_RESULT);

  const handleSubmitCreate = async () => {
    try {
      const result = await createTestResult({
        variables: {
          user_id: "60d8f33e7f3f83479cbf5b4f", // hardcode for now
          bsl: 95.4,
          note: {
            note_description: "Fasting blood sugar before breakfast",
          },
          log_timestamp: new Date().toISOString(),
          confirmed: true,
        },
      });
      console.log("Mutation result:", result);
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

        <PickerOpenerRow onPress={() => {}} text="Date" value={date} />
        <PickerOpenerRow onPress={() => {}} text="Time" value={time} />
        <PickerOpenerRow
          onPress={() => {}}
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
          <Icon as={AddIcon} size="sm" mr="$2" />
        </HStack>
        <Pressable
          onPress={() => {
            /* Open notes input */
          }}
          borderTopWidth={1}
          borderTopColor="$borderLight200"
        >
          <HStack alignItems="center" p="$3">
            <Text color="$textLight400">No notes to display</Text>
          </HStack>
        </Pressable>
      </VStack>

      <FormControl>
        <Button mt="$8" onPress={handleSubmitUpdate}>
          <ButtonText>Save</ButtonText>
        </Button>
      </FormControl>
    </VStack>
  );
};

export default GlucoseLogScreen;
