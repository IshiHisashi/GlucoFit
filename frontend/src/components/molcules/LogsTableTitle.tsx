import { Text } from "@gluestack-ui/themed";
import { HStack, VStack } from "@gluestack-ui/themed";
import React, { FC } from "react";

import GlucoButtonNoOutline from "../atoms/GlucoButtonNoOutline";
import { AngleRightCustom } from "../svgs/svgs";

interface LogsTableProps {
  title: string;
  subTitle: string;
  onPressTitleRightButton: () => void;
}

const LogsTableTitle: FC<LogsTableProps> = (props) => {
  const { title, subTitle, onPressTitleRightButton } = props;

  return (
    <VStack pb="$4">
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize={20} fontFamily="$bold" color="$neutralDark90">
          {title}
        </Text>
        <GlucoButtonNoOutline
          text="See more"
          isFocused={false}
          isDisabled={false}
          onPress={onPressTitleRightButton}
          iconRight={AngleRightCustom}
          styleForHstack={{ gap: 1 }}
          styleForText={{ fontFamily: "$regular", fontSize: 12 }}
        />
      </HStack>
      <Text fontSize={12} color="$neutralDark40">
        {subTitle}
      </Text>
    </VStack>
  );
};

export default LogsTableTitle;
