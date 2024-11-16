import React, { FC } from "react";
import { View, Text, Pressable } from "@gluestack-ui/themed";

type NotificationCardProps = {};

const NotificationCard = (props: NotificationCardProps) => {
  console.log("NotificationCard rendered");

  const {} = props;
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
            <Text fontSize={12}>DAILY LOG REMINDER</Text>
            <Text fontSize={18} fontFamily="$bold">
              Don't forget to log today
            </Text>
            <Text fontSize={12} color="#ADADAD">
              Oct 20
            </Text>
          </View>
        </View>
        <Text alignSelf="center">o</Text>
      </View>
    </Pressable>
  );
};

export default NotificationCard;
