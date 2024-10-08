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
  value: Date | string;
}

const PickerOpenerRow: FC<PickerOpenerRowProps> = (props) => {
  const { setShowPicker, text, value } = props;
  return (
    <Pressable
      onPress={() => {
        setShowPicker(true);
      }}
    >
      <HStack
        justifyContent="space-between"
        p="$3"
        borderTopWidth={1}
        borderTopColor="$borderLight200"
      >
        <Text>{text}</Text>
        <HStack alignItems="center">
          <Text mr="$2">
            {typeof value === "string"
              ? value
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
