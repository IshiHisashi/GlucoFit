import {
  Text,
  FormControl,
  Input,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
import React, { FC } from "react";

interface InputFieldForBslProps {
  value: string;
  onChangeText: (text: string) => void;
  isDisabled: boolean;
}

const InputFieldForBsl: FC<InputFieldForBslProps> = (props) => {
  const { value, onChangeText, isDisabled } = props;

  return (
    <FormControl isRequired isDisabled={isDisabled}>
      <Input
        variant="outline"
        size="md"
        w={168}
        h={70}
        p="$2"
        pr="$4"
        borderRadius={10}
        bg="$neutralWhite"
        borderColor="$primaryIndigo10"
        $focus-borderColor="$primaryIndigo20"
        $focus-bgColor="$primaryIndigo5"
        $disabled-borderColor="$neutralDark5"
        $disabled-bgColor="$neutralDark5"
      >
        <InputField
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          fontSize={28}
          fontFamily="$bold"
          color="$neutralDark60"
          $focus-color="$primaryIndigo80"
          $disabled-color="$neutralDark15"
        />
        <InputSlot>
          <Text
            fontSize={14}
            color="$neutralDark60"
            fontFamily="$bold"
            $disabled-color="$neutralDark15"
          >
            mmol/L
          </Text>
        </InputSlot>
      </Input>
    </FormControl>
  );
};

export default InputFieldForBsl;
