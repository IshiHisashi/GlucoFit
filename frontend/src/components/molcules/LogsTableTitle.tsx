import { Pressable, Text } from "@gluestack-ui/themed";
import { HStack, VStack } from "@gluestack-ui/themed";
import React, { FC } from "react";

import GlucoButtonNoOutline from "../atoms/GlucoButtonNoOutline";
import { AngleRightCustom, PlusCustom } from "../svgs/svgs";

interface LogsTableProps {
  title: string;
  subTitle?: string;
  onPressTitleRightButton?: () => void;
}

const LogsTableTitle: FC<LogsTableProps> = (props) => {
  const { title, subTitle, onPressTitleRightButton } = props;

  return (
    <VStack pb="$4">
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize={20} fontFamily="$bold" color="$neutralDark90">
          {title}
        </Text>

        {onPressTitleRightButton && title === "Add Notes" ? (
          <Pressable onPress={onPressTitleRightButton}>
            <PlusCustom color="#313131" />
          </Pressable>
        ) : onPressTitleRightButton ? (
          <GlucoButtonNoOutline
            text="Show more"
            isFocused={false}
            isDisabled={false}
            onPress={onPressTitleRightButton}
            iconRight={AngleRightCustom}
            styleForHstack={{ gap: 1 }}
            styleForText={{ fontFamily: "$regular", fontSize: 12 }}
          />
        ) : null}
      </HStack>

      {subTitle && (
        <Text fontSize={12} color="$neutralDark40">
          {subTitle}
        </Text>
      )}
    </VStack>
  );
};

export default LogsTableTitle;
