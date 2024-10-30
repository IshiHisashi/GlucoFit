import { HStack, Text, VStack, Pressable, Box } from "@gluestack-ui/themed";
import React, { FC } from "react";

import LogsTableTitle from "../molcules/LogsTableTitle";
import LogsTableRow from "../molcules/LogsTableRow";

interface rowData {
  id: string;
  icon: any;
  text: string;
  subText: string;
  value: string | number;
  unit?: string;
  onPressRow?: () => void;
}

interface LogsTableProps {
  title: string;
  subTitle: string;
  onPressTitleRightButton: () => void;
  rowsData: rowData[];
}

const LogsTable: FC<LogsTableProps> = (props) => {
  const { title, subTitle, onPressTitleRightButton, rowsData } = props;

  return (
    <VStack
      borderWidth={1}
      borderColor="$primaryIndigo10"
      borderRadius={10}
      p="$4"
      bg="$neutralWhite"
    >
      <LogsTableTitle
        title={title}
        subTitle={subTitle}
        onPressTitleRightButton={onPressTitleRightButton}
      />

      {rowsData?.length > 0 &&
        rowsData.map((obj) => <LogsTableRow obj={obj} />)}
    </VStack>
  );
};

export default LogsTable;
