import React, { useState } from "react";
import { View, Text, Pressable, Image } from "@gluestack-ui/themed";
import { useMutation } from "@apollo/client";
import { MARK_NOTIFICATION_AS_READ } from "../../utils/query/notificationQuery";

type NotificationCardProps = {
  id?: string;
  title?: string;
  description?: string;
  type?: string;
  read?: boolean;
  createdAt?: string;
};

const NotificationCard = (props: NotificationCardProps) => {
  const { id, title, description, type, read, createdAt } = props;
  const [isHovered, setIsHovered] = useState(false);

  const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
    variables: { id },
    onCompleted: (data) => {
      console.log("Notification marked as read:", data);
    },
    onError: (error) => {
      console.error("Error marking notification as read:", error);
    },
  });

  const formattedDate = createdAt
    ? new Date(parseInt(createdAt)).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "No date available";

  return (
    <Pressable
      onPress={() => {
        if (id && !read) {
          markAsRead()
            .then((response) => {
              console.log("Mutation successful:", response.data);
            })
            .catch((error) => {
              console.error("Mutation failed:", error.message);
            });
        }
      }}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? "#f0f0f0" : "transparent",
      }}
    >
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
          <Image
            source={
              type === "Reminder"
                ? require("../../../assets/notifications/logNotification.png")
                : require("../../../assets/notifications/insightNotification.png")
            }
            resizeMode="contain"
            mx="auto"
            w={40}
            alt="Character is reminding taking log"
          />
          <View flexDirection="column" alignSelf="center">
            <Text fontSize={13}>{title?.toUpperCase()}</Text>
            <Text fontSize={17} fontFamily="$bold">
              {description}
            </Text>
            <Text fontSize={12} color="#ADADAD">
              {formattedDate}
            </Text>
          </View>
        </View>
        {!read && (
          <View
            alignSelf="center"
            w={13}
            h={13}
            bg="black"
            rounded={100}
          ></View>
        )}
      </View>
    </Pressable>
  );
};

export default NotificationCard;
