import {
  ChevronRightIcon,
  HStack,
  Icon,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import React, { FC } from "react";

interface PickerOpenerRowProps {
  onPress(): void;
  text: string;
  value: string;
}

const PickerOpenerRow: FC<PickerOpenerRowProps> = (props) => {
  const { onPress, text, value } = props;
  return (
    <Pressable
      onPress={() => {
        /* Open date picker */
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
          <Text mr="$2">{value}</Text>
          <Icon as={ChevronRightIcon} size="sm" />
        </HStack>
      </HStack>
    </Pressable>
  );
};

export default PickerOpenerRow;
