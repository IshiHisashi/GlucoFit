import {
  HStack,
  Text,
  VStack,
  Pressable,
  Box,
  Input,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
import React, { Dispatch, FC, SetStateAction } from "react";

import LogsTableTitle from "../molcules/LogsTableTitle";
import LogsTableRow from "../molcules/LogsTableRow";
import PickerOpenerRow from "../molcules/PickerOpenerRow";
import { AngleRightCustom } from "../svgs/svgs";
import MedicineListCard from "../molcules/MedicineListCard";

interface LogsTableRowDirectInputProps {
  obj: pickerData;
}

const LogsTableRowDirectInput: FC<LogsTableRowDirectInputProps> = (props) => {
  const { obj } = props;

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      py="$3"
      borderBottomWidth={1}
      borderBottomColor="#EEEEEE"
    >
      <Text fontFamily="$semibold" fontSize={17} color="$neutralDark90">
        {obj.text}
      </Text>
      <HStack alignItems="center">
        <Input variant="outline" size="md" w="$40">
          <InputField
            placeholder="---"
            value={obj.value as string}
            onChangeText={obj.onChangeText}
            keyboardType="numeric"
            textAlign="right"
          />
          <InputSlot pr="$3">
            <Text>g</Text>
          </InputSlot>
        </Input>
        <AngleRightCustom color="#313131" />
      </HStack>
    </HStack>
  );
};

interface rowData {
  id: string;
  icon: any;
  text: string;
  subText: string;
  value: string | number;
  unit?: string;
  onPressRow?: () => void;
}

interface pickerData {
  setShowPicker?: Dispatch<SetStateAction<boolean>>;
  onChangeText?: Dispatch<SetStateAction<string>>;
  text: string;
  value: Date | string | { hours: number; minutes: number };
}

interface noteData {
  noteExcerpt: string;
  onPressNote: () => void;
}

interface medicineData {
  id: string;
  medicine_name: string;
  dosage: string;
  unit: string;
  isSelected: boolean;
  onPressMedicine: () => void;
}

interface LogsTableProps {
  title?: string;
  subTitle?: string;
  onPressTitleRightButton?: () => void;
  rowsData?: rowData[];
  pickerData?: pickerData[];
  noteData?: noteData;
  medicinesData?: medicineData[];
  tableType?: "logs" | "pickers" | "notes" | "medicines";
}

const LogsTable: FC<LogsTableProps> = (props) => {
  const {
    title,
    subTitle,
    onPressTitleRightButton,
    rowsData,
    pickerData,
    noteData,
    medicinesData,
    tableType = "logs",
  } = props;

  return (
    <VStack
      borderWidth={1}
      borderColor="$primaryIndigo10"
      borderRadius={10}
      p="$4"
      bg="$neutralWhite"
    >
      {title && (
        <LogsTableTitle
          title={title}
          subTitle={subTitle}
          onPressTitleRightButton={onPressTitleRightButton}
        />
      )}

      {tableType === "logs" &&
        rowsData?.length > 0 &&
        rowsData.map((obj) => <LogsTableRow obj={obj} />)}

      {tableType === "pickers" &&
        pickerData?.length > 0 &&
        pickerData.map((obj) => {
          if (obj.setShowPicker) return <PickerOpenerRow obj={obj} />;
          if (obj.onChangeText) return <LogsTableRowDirectInput obj={obj} />;
        })}

      {tableType === "notes" && noteData?.noteExcerpt && (
        <Pressable
          onPress={noteData.onPressNote}
          py="$3"
          borderBottomWidth={1}
          borderBottomColor="#EEEEEE"
        >
          <HStack alignItems="center">
            <Text color="$neutralDark80" fontSize={16}>
              {noteData.noteExcerpt}
            </Text>
          </HStack>
        </Pressable>
      )}

      {tableType === "medicines" &&
        medicinesData?.length > 0 &&
        medicinesData.map((obj) => <MedicineListCard obj={obj} />)}
    </VStack>
  );
};

export default LogsTable;
