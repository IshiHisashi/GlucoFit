import React, { FC, useState, type PropsWithChildren, useEffect } from "react";
import {
  View,
  Text,
  Input,
  InputField,
  FormControl,
} from "@gluestack-ui/themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type TimeInputProps = {
  value?: string | Date;
  isDisabled?: boolean;
  labelText?: string;
  bottomText?: string;
  onChange: React.Dispatch<React.SetStateAction<string | Date>>;
  placeHolder?: string;
};

const DateInput: React.FC<PropsWithChildren<TimeInputProps>> = (props) => {
  const { value, isDisabled, labelText, onChange, placeHolder } = props;

  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  const formatDateForUI = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month} / ${day} / ${year}`;
  };

  useEffect(() => {
    if (value) {
      const dateValue = typeof value === "string" ? new Date(value) : value;
      setFormattedDate(formatDateForUI(dateValue));
    }
  }, [value]);

  const handleDateConfirm = (date: Date) => {
    setFormattedDate(formatDateForUI(date));
    onChange(date);
    setIsDatePickerOpen(false);
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
            value={formattedDate}
            fontSize={15}
            color="$neutralDark60"
            pl={4}
            editable={false}
            onPress={() => setIsDatePickerOpen(true)}
            placeholder={"MM / DD / YYYY"}
            placeholderTextColor="$neutralDark60"
          />
        </Input>
        <DateTimePickerModal
          isVisible={isDatePickerOpen}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setIsDatePickerOpen(false)}
        />
      </FormControl>
    </View>
  );
};

export default DateInput;
