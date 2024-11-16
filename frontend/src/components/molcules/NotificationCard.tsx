import React from "react";
import { View, Text, Pressable } from "@gluestack-ui/themed";

type NotificationCardProps = {
  title?: string;
  description?: string;
  type?: string;
  read?: boolean;
  createdAt?: string;
};

const NotificationCard = (props: NotificationCardProps) => {
  const { title, description, type, read, createdAt } = props;

  const formattedDate = createdAt
    ? new Date(parseInt(createdAt)).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "No date available";

  return (
    <Pressable>
      <View
        flexDirection="row"
        justifyContent="space-between"
        mx={16}
        px={2}
        py={16}
        borderBottomWidth={0.5}
        borderBottomColor="#ccc"
      >
        <View flexDirection="row" gap={10}>
          <Text>Icon</Text>
          <View flexDirection="column">
            <Text fontSize={13}>{title}</Text>
            <Text fontSize={17} fontFamily="$bold">
              {description}
            </Text>
            <Text fontSize={12} color="#ADADAD">
              {formattedDate}
            </Text>
          </View>
        </View>
        <Text alignSelf="center">o</Text>
      </View>
    </Pressable>
  );
};

export default NotificationCard;
