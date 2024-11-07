import { Text } from "@gluestack-ui/themed";
import { HStack, Pressable, Box, VStack } from "@gluestack-ui/themed";
import React, { FC } from "react";

interface RowData {
  __typename?: string;
  id: string;
  icon: any;
  text: string;
  subText: string;
  value: string | number;
  unit?: string;
  onPressRow?: () => void;
}

interface LogsTableRowProps {
  obj: RowData;
}

const LogsTableRow: FC<LogsTableRowProps> = (props) => {
  const { obj } = props;

  return (
    <Pressable
      onPress={obj.onPressRow}
      key={obj.id}
      py="$3"
      borderBottomWidth={1}
      borderBottomColor="#EEEEEE"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems="center" space="sm">
          {/* <Box
            width={45}
            height={45}
            borderRadius="$full"
            bg="#E0E0E0"
            justifyContent="center"
            alignItems="center"
          > */}
          {obj.icon}
          {/* </Box> */}
          <VStack>
            <Text fontFamily="$bold" fontSize={14} color="$neutralDark90">
              {obj.text}
            </Text>
            <Text fontSize={12} color="$neutralDark30">
              {obj.subText}
            </Text>
          </VStack>
        </HStack>
        <VStack alignItems="flex-end" justifyContent="center">
          <Text fontSize={22} fontFamily="$bold" color="$neutralDark90">
            {obj.value}
          </Text>
          {obj.unit && (
            <Text color="$neutralDark50" fontSize={12} marginTop={-6}>
              {obj.unit}
            </Text>
          )}
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default LogsTableRow;
