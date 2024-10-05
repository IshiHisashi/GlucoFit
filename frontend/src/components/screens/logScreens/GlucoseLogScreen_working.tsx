import React, { useState } from "react";
import {
  ButtonText,
  Center,
  FormControl,
  FormControlLabelText,
  HStack,
  Image,
  Input,
  InputField,
  Text,
  VStack,
  FormControlLabel,
  Textarea,
  TextareaInput,
  Button,
  InputSlot,
} from "@gluestack-ui/themed";
import GlucoFitFaceSample from "../../../../assets/GlucoFit-Face-sample.png";
import { gql, useMutation } from "@apollo/client";

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

const GlucoseLogScreen: React.FC = () => {
  const [bsl, setBsl] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [logTimestamp, setLogTimestamp] = useState("");

  const [createTestResult, { data, loading, error }] =
    useMutation(CREATE_TEST_RESULT);

  const handleSubmit = async () => {
    try {
      const result = await createTestResult({
        // variables: {
        //   user_id: "60d8f33e7f3f83479cbf5b4f", // hardcode for now
        //   bsl: parseFloat(bsl),
        //   note: {
        //     note_description: noteDescription,
        //   },
        //   log_timestamp: logTimestamp,
        //   confirmed: true,
        // },
        variables: {
          user_id: "60d8f33e7f3f83479cbf5b4f",
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

  return (
    <VStack space="sm" p={4}>
      <Center>
        <Text fontSize="$xl">Glucose Log Screen</Text>
      </Center>

      <Center>
        <Image source={GlucoFitFaceSample} alt="GlucoFit face" size="2xl" />
      </Center>

      <FormControl isRequired>
        <FormControlLabel>
          <FormControlLabelText>Blood Sugar Level</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            type="number"
            placeholder="Enter your glucose level..."
            onChangeText={setBsl}
            value={bsl}
          />
          <InputSlot pr="$3">
            <Text>mg/dL</Text>
          </InputSlot>
        </Input>
      </FormControl>

      <FormControl isRequired>
        <FormControlLabel>
          <FormControlLabelText>Log Timestamp</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            type="datetime-local"
            placeholder="YYYY-MM-DDTHH:mm:ssZ"
            onChangeText={setLogTimestamp}
            value={logTimestamp}
          />
        </Input>
      </FormControl>

      <FormControl isRequired>
        <FormControlLabel>
          <FormControlLabelText>Additional Notes</FormControlLabelText>
        </FormControlLabel>
        <Textarea>
          <TextareaInput
            placeholder="e.g., Breakfast is apple"
            onChangeText={setNoteDescription}
            value={noteDescription}
          />
        </Textarea>
      </FormControl>

      <FormControl>
        <Button onPress={handleSubmit} isDisabled={loading}>
          <ButtonText>{loading ? "Saving..." : "Save"}</ButtonText>
        </Button>
      </FormControl>

      {error && <Text color="red.500">Error: {error.message}</Text>}
      {data && <Text color="green.500">Test result saved successfully!</Text>}
    </VStack>
  );
};

export default GlucoseLogScreen;
