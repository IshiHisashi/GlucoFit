import {
  ChevronRightIcon,
  HStack,
  Icon,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import React, { Dispatch, FC, SetStateAction } from "react";

interface PickerOpenerRowProps {
  setShowPicker: Dispatch<SetStateAction<boolean>>;
  text: string;
  value: Date | string | { hours: number; minutes: number };
  independent?: boolean;
}

const PickerOpenerRow: FC<PickerOpenerRowProps> = (props) => {
  const { setShowPicker, text, value, independent = false } = props;
  return (
    <Pressable
      onPress={() => {
        setShowPicker(true);
      }}
    >
      <HStack
        justifyContent="space-between"
        p="$3"
        borderColor="$borderLight200"
        style={
          independent
            ? {
                borderWidth: 1,
                borderRadius: 5,
              }
            : { borderTopWidth: 1 }
        }
      >
        <Text>{text}</Text>
        <HStack alignItems="center">
          <Text mr="$2">
            {typeof value === "string"
              ? value
              : text === "Duration"
                ? `${value.hours} h ${value.minutes} m`
                : text === "Date"
                  ? value.toDateString()
                  : value.toTimeString()}
          </Text>
          <Icon as={ChevronRightIcon} size="sm" />
        </HStack>
      </HStack>
    </Pressable>
  );
};

export default PickerOpenerRow;
