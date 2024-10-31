import { Box, HStack, VStack } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import React, { FC } from "react";
import {
  BookmarkCustom,
  CapsuleCustom,
  HeartbeatCustom,
  HeartrateCustom,
  RestaurantCustom,
} from "../svgs/svgs";
import { Text } from "@gluestack-ui/themed";
import { transform } from "@babel/core";

interface InsightCardProps {
  key: string;
  title: string;
  category: string;
  description?: string;
  image: string;
  width?: number;
  height?: number;
  onPressBookmark: () => void;
  onPressCard: () => void;
}

const InsightCard: FC<InsightCardProps> = (props) => {
  const {
    key,
    title,
    category,
    description,
    image,
    width,
    height,
    onPressBookmark,
    onPressCard,
  } = props;

  return (
    <Pressable
      key={key}
      w={width || "$full"}
      bg="$neutralWhite"
      borderRadius="$8"
      onPress={onPressCard}
    >
      <Box position="relative">
        <Image
          source={image || require("../../../assets/Image Placeholder.png")}
          alt="alt text"
          w="$full"
          h={height || 150}
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
        />
        <Pressable
          position="absolute"
          top="$2"
          right="$2"
          bg="$neutralDark5"
          p="$2.5"
          borderRadius="$full"
          onPress={onPressBookmark}
        >
          <BookmarkCustom color="#5E5E5E" size={20} />
        </Pressable>
      </Box>
      <VStack p="$2" space="xs">
        <Text fontFamily="$bold" fontSize={14} color="$neutralDark60">
          {title}
        </Text>
        <HStack alignItems="center" space="xs">
          {category === "Food" && (
            <RestaurantCustom color="#7B7B7B" size={12} />
          )}
          {category === "Medication" && (
            <CapsuleCustom color="#7B7B7B" size={12} />
          )}
          {category === "Wellness" && (
            <HeartbeatCustom color="#7B7B7B" size={12} />
          )}
          <Text color="$neutralDark40" fontSize={10}>
            {category}
          </Text>
        </HStack>
        {description && (
          <Text color="$neutralDark60" fontSize={12}>
            {description}
          </Text>
        )}
      </VStack>
    </Pressable>
  );
};

export default InsightCard;
