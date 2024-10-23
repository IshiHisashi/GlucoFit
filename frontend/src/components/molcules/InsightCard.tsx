import { Box, VStack } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import React, { FC } from "react";
import { BookmarkCustom } from "../svgs/svgs";
import { Text } from "@gluestack-ui/themed";

interface InsightCardProps {
  title: string;
  category: string;
  image: string;
  width?: number;
  height?: number;
  onPressBookmark: () => void;
  onPressCard: () => void;
}

const InsightCard: FC<InsightCardProps> = (props) => {
  const {
    title,
    category,
    image,
    width,
    height,
    onPressBookmark,
    onPressCard,
  } = props;

  return (
    <Pressable
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
          bg="$neutralWhite"
          p="$2"
          borderRadius="$full"
          onPress={onPressBookmark}
        >
          <BookmarkCustom color="#5E5E5E" size={20} />
        </Pressable>
      </Box>
      <VStack p="$2">
        <Text>{title}</Text>
        <Text color="$neutralDark40">{category}</Text>
      </VStack>
    </Pressable>
  );
};

export default InsightCard;
