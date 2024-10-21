import {
  Pressable,
  Text,
  View,
  HStack,
  VStack,
  Input,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
import React, { FC } from "react";

import { BellCustom, SearchCustom } from "../svgs/svgs";

interface HeaderBasicProps {
  routeName: "Home" | "Insights" | "Logs" | "BadgeScreen";
  searchValue?: string;
  onChangeSearchValue?: (value: string) => void;
}

const HeaderBasic: FC<HeaderBasicProps> = (props) => {
  const { routeName, searchValue, onChangeSearchValue } = props;

  const headerStyles = {
    Home: {
      bg: "$primaryIndigo60",
      notificationColor: "#ffffff",
    },
    Insights: {
      bg: "$primaryIndigo5",
      notificationColor: "#3D00D6",
    },
    Logs: {
      bg: "$primaryIndigo5",
      notificationColor: "#3D00D6",
    },
    BadgeScreen: {
      bg: "$primaryIndigo5",
      notificationColor: "#3D00D6",
    },
  };

  const currentStyle = headerStyles[routeName];

  return (
    <HStack
      bg={currentStyle.bg}
      justifyContent="space-between"
      p="$4"
      space="lg"
      alignItems="center"
    >
      {routeName === "Home" && (
        <VStack>
          <Text fontSize="$3xl" fontFamily="$bold" color="$neutralWhite">
            Hi, Angie!
          </Text>
          <Text color="$neutralWhite">Today, October 12, 2024</Text>
        </VStack>
      )}

      {(routeName === "Insights" ||
        routeName === "Logs" ||
        routeName === "BadgeScreen") && (
        <Input flex={1}>
          <InputSlot pl="$3">
            <SearchCustom color="#4800FF" />
          </InputSlot>
          <InputField
            placeholder="Search"
            value={searchValue}
            onChangeText={onChangeSearchValue}
          />
        </Input>
      )}

      <HStack alignItems="center" space="md">
        <Pressable onPress={() => {}}>
          <View h="$8" w="$8" bg="#808080" borderRadius="$full" />
        </Pressable>
        <Pressable onPress={() => {}}>
          <BellCustom color={currentStyle.notificationColor} size={27} />
        </Pressable>
      </HStack>
    </HStack>
  );
};

export default HeaderBasic;
