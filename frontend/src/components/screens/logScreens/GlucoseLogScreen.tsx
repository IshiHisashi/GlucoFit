import {
  ButtonText,
  Center,
  FormControl,
  FormControlLabelText,
  HStack,
  Image,
  Input,
  InputField,
  InputIcon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { FormControlLabel } from "@gluestack-ui/themed";
import { Textarea } from "@gluestack-ui/themed";
import { TextareaInput } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { InputSlot } from "@gluestack-ui/themed";
import { gql, useQuery, useMutation } from "@apollo/client";

import GlucoFitFaceSample from "../../../../assets/GlucoFit-Face-sample.png";

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

const GlucoseLogScreen: React.FC = () => {
  const [createTestResult, { data, loading, error }] =
    useMutation(CREATE_TEST_RESULT);

  const handleSubmit = async () => {
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

  // const { loading, error, data } = useQuery(GET_TEST_RESULTS);
  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
  // console.log(data);

  return (
    <VStack>
      <Center>
        <Text>This is glucose log screen.</Text>
      </Center>

      <Center>
        <Image source={GlucoFitFaceSample} alt="GlucoFit face" />
      </Center>

      <FormControl isRequired>
        <Input>
          <InputField
            type="text"
            placeholder="Input your glucose level..."
            onChangeText={() => {}}
            // value={}
          />
          <InputSlot pr="$3" onPress={() => {}}>
            <Text>mg/dL</Text>
          </InputSlot>
        </Input>
      </FormControl>

      <FormControl isRequired>
        <HStack>
          <FormControlLabel>
            <FormControlLabelText>Time</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="date..."
              onChangeText={() => {}}
              // value={}
            />
          </Input>
          <Input>
            <InputField
              type="text"
              placeholder="time..."
              onChangeText={() => {}}
              // value={}
            />
          </Input>
        </HStack>
      </FormControl>

      <FormControl isRequired>
        <HStack>
          <FormControlLabel>
            <FormControlLabelText>Time Period</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="time period..."
              onChangeText={() => {}}
              // value={}
            />
          </Input>
        </HStack>
      </FormControl>

      <FormControl isRequired>
        <VStack>
          <FormControlLabel>
            <FormControlLabelText>Additional Notes</FormControlLabelText>
          </FormControlLabel>
          <Textarea>
            <TextareaInput placeholder="Additional Notes Here" />
          </Textarea>
        </VStack>
      </FormControl>

      <FormControl>
        <Button onPress={handleSubmit}>
          <ButtonText>Save</ButtonText>
        </Button>
      </FormControl>
    </VStack>
  );
};

export default GlucoseLogScreen;
