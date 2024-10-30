import { HStack, VStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import React, { FC } from "react";
import {
  IconForActivityNotification,
  IconForInsightNotification,
  IconForLogNotification,
} from "../svgs/svgsForNotificationIcons";

interface NotificationData {
  id: string;
  title: string;
  description: string;
  type: string;
  createdAt: Date;
  read: boolean;
  article_url?: string;
  article_title?: string;
  onPress: () => void;
}

interface NotificationRowProps {
  obj: NotificationData;
}

const NotificationRow: FC<NotificationRowProps> = (props) => {
  const { obj } = props;

  return (
    <Pressable
      onPress={obj.onPress}
      key={obj.id}
      py="$4"
      mx="$4"
      borderBottomWidth={1}
      borderBottomColor="#EEEEEE"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems="flex-start" space="sm">
          {obj.type === "log" && <IconForLogNotification />}
          {obj.type === "insight" && <IconForInsightNotification />}
          {obj.type === "activity" && <IconForActivityNotification />}

          <VStack>
            <Text fontSize={10} color="$neutralDark90">
              {obj.title.toUpperCase()}
            </Text>
            <Text fontSize={17} color="$neutralDark90" fontFamily="$bold">
              {obj.description}
            </Text>
            <Text fontSize={12} color="$neutralDark20" pt="$1">
              {obj.createdAt}
            </Text>
          </VStack>
        </HStack>

        {!obj.read && (
          <Box
            width={13}
            height={13}
            borderRadius="$full"
            bg="$neutralDark70"
            justifyContent="center"
            alignItems="center"
          />
        )}
      </HStack>
    </Pressable>
  );
};

export default NotificationRow;
