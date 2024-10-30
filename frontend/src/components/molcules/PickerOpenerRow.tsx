import {
  ChevronRightIcon,
  HStack,
  Icon,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import React, { Dispatch, FC, SetStateAction } from "react";
import { AngleRightCustom } from "../svgs/svgs";

interface PickerData {
  setShowPicker: Dispatch<SetStateAction<boolean>>;
  text: string;
  value: Date | string | { hours: number; minutes: number };
}

interface PickerOpenerRowProps {
  obj: PickerData;
}

const PickerOpenerRow: FC<PickerOpenerRowProps> = (props) => {
  const { obj } = props;
  return (
    <Pressable
      onPress={() => {
        obj.setShowPicker(true);
      }}
      py="$3"
      borderBottomWidth={1}
      borderBottomColor="#EEEEEE"
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        // borderColor="$borderLight200"
        // style={
        //   independent
        //     ? {
        //         borderWidth: 1,
        //         borderRadius: 5,
        //       }
        //     : { borderTopWidth: 1 }
        // }
      >
        <Text fontFamily="$semibold" fontSize={17} color="$neutralDark90">
          {obj.text}
        </Text>
        <HStack alignItems="center">
          <Text fontSize={16} color="$neutralDark80">
            {typeof obj.value === "string"
              ? obj.value
              : obj.text === "Duration"
                ? `${obj.value.hours} h ${obj.value.minutes} m`
                : obj.text === "Date"
                  ? obj.value.toDateString()
                  : obj.value.toTimeString()}
          </Text>
          <AngleRightCustom color="#313131" />
        </HStack>
      </HStack>
    </Pressable>
  );
};

export default PickerOpenerRow;
