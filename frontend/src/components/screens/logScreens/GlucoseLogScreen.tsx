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

import GlucoFitFaceSample from "../../../../assets/GlucoFit-Face-sample.png";
import { FormControlLabel } from "@gluestack-ui/themed";
import { Textarea } from "@gluestack-ui/themed";
import { TextareaInput } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { InputSlot } from "@gluestack-ui/themed";

const GlucoseLogScreen: React.FC = () => {
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
        <Button onPress={() => {}}>
          <ButtonText>Save</ButtonText>
        </Button>
      </FormControl>
    </VStack>
  );
};

export default GlucoseLogScreen;
