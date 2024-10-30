import { HStack, Text, VStack, Pressable, Box } from "@gluestack-ui/themed";
import React, { Dispatch, FC, SetStateAction } from "react";

import LogsTableTitle from "../molcules/LogsTableTitle";
import LogsTableRow from "../molcules/LogsTableRow";
import PickerOpenerRow from "../molcules/PickerOpenerRow";

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
  setShowPicker: Dispatch<SetStateAction<boolean>>;
  text: string;
  value: Date | string | { hours: number; minutes: number };
}

interface noteData {
  noteExcerpt: string;
  onPressNote: () => void;
}

interface LogsTableProps {
  title?: string;
  subTitle?: string;
  onPressTitleRightButton?: () => void;
  rowsData?: rowData[];
  pickerData?: pickerData[];
  noteData?: noteData;
  tableType?: "logs" | "pickers" | "notes";
}

const LogsTable: FC<LogsTableProps> = (props) => {
  const {
    title,
    subTitle,
    onPressTitleRightButton,
    rowsData,
    pickerData,
    noteData,
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
        pickerData.map((obj) => <PickerOpenerRow obj={obj} />)}

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
    </VStack>
  );
};

export default LogsTable;
