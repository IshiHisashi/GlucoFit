import React, { FC, useState, type PropsWithChildren } from "react";
import {
  HStack,
  View,
  Text,
  Input,
  InputField,
  FormControl,
} from "@gluestack-ui/themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { PlusCustom } from "../svgs/svgs";

type TimeInputProps = {
  value?: string | Date;
  isDisabled?: boolean;
  labelText?: string;
  bottomText?: string;
  onChange: React.Dispatch<React.SetStateAction<string | Date>>;
  onPress?: any;
  placeHolder?: string;
};

const TimeInput: React.FC<PropsWithChildren<TimeInputProps>> = (props) => {
  const { value, isDisabled, labelText, onChange, onPress, placeHolder } =
    props;

  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [formattedTime, setFormattedTime] = useState("");

  const handleTimeConfirm = (time: Date) => {
    // UI should be 'hh:mm' while returned value to parent needs to be full date type
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    setFormattedTime(`${hours}:${minutes}`);

    const date = new Date(value || new Date());
    date.setHours(time.getHours(), time.getMinutes(), 0, 0);

    onChange(date);
    console.log(date);
    setIsTimePickerOpen(false);
  };

  const getIconColor = () => {
    if (isDisabled) return "#C2C2C2";
    if (isPressed) return "#414853";
    if (isFocused) return "#3100AD";
    return "#414853";
  };

  return (
    <View flexDirection="column" gap={8}>
      <Text color="black" fontSize={14} fontFamily="$bold">
        {labelText}
      </Text>
      <FormControl isDisabled={isDisabled} flex={1}>
        <Input
          variant="outline"
          size="md"
          w="$full"
          h={48}
          px="$4"
          borderRadius={10}
          bg="$neutralWhite"
          borderColor={isPressed ? "$primaryIndigo20" : "$primaryIndigo10"}
          $active-borderColor="$primaryIndigo20"
          $focus-borderColor="$primaryIndigo80"
          $disabled-borderColor="$neutralDark5"
          $disabled-bgColor="$neutralDark5"
        >
          <InputField
            value={formattedTime}
            fontSize={15}
            // fontFamily="$bold"
            color="$neutralDark60"
            $focus-color="$primaryIndigo80"
            $disabled-color="$neutralDark15"
            pl={4}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress}
            placeholder={placeHolder}
            placeholderTextColor="$neutralDark60"
          />
          <HStack alignItems="center" space="xs">
            <PlusCustom
              size={20}
              color={getIconColor()}
              onPress={() => setIsTimePickerOpen(true)}
            />
          </HStack>
        </Input>
        <DateTimePickerModal
          isVisible={isTimePickerOpen}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setIsTimePickerOpen(false)}
          is24Hour={true}
        />
      </FormControl>
    </View>
  );
};

export default TimeInput;
