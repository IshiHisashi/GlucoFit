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
import { NavigationProp } from "@react-navigation/native";

import { BellCustom, SearchCustom } from "../svgs/svgs";
import InputFieldGeneral from "../atoms/InputFieldGeneral";

interface HeaderBasicProps {
  routeName: "Home" | "Insights" | "Logs" | "BadgeScreen";
  userName?: string;
  searchValue?: string;
  onChangeSearchValue?: (value: string) => void;
  navigation?: NavigationProp<any>;
}

const HeaderBasic: FC<HeaderBasicProps> = (props) => {
  const { routeName, userName, searchValue, onChangeSearchValue, navigation } =
    props;

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
      bg: "$neutralWhite",
      notificationColor: "#3D00D6",
    },
    BadgeScreen: {
      bg: "$primaryIndigo5",
      notificationColor: "#3D00D6",
    },
  };

  const currentStyle = headerStyles[routeName];

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <HStack
      bg={currentStyle.bg}
      justifyContent="space-between"
      p="$4"
      space="lg"
      alignItems="center"
    >
      {routeName === "Home" && (
        <>
          <VStack>
            <Text fontSize={28} fontFamily="$bold" color="$neutralWhite">
              Hi, {userName || "there"}!
            </Text>
            <Text color="$neutralWhite" fontSize={13}>
              Today, {formattedDate}
            </Text>
          </VStack>

          <HStack alignItems="center" space="md">
            <Pressable onPress={() => {}}>
              <View h="$8" w="$8" bg="#808080" borderRadius="$full" />
            </Pressable>
            <Pressable onPress={() => navigation?.navigate("Temp")}>
              <BellCustom color={currentStyle.notificationColor} size={27} />
            </Pressable>
          </HStack>
        </>
      )}

      {routeName === "Logs" && (
        <>
          <View />
          <Text
            fontSize={20}
            fontFamily="$bold"
            color="$neutralDark90"
            textAlign="center"
          >
            Logs History
          </Text>
          <View />
        </>
      )}

      {(routeName === "Insights" ||
        // routeName === "Logs" ||
        routeName === "BadgeScreen") && (
        <InputFieldGeneral
          value={searchValue}
          onChangeText={onChangeSearchValue}
          isRequired={true}
          isDisabled={false}
          isInvalid={false}
          placeholder="Search"
          iconLeft={SearchCustom}
        />
      )}
    </HStack>
  );
};

export default HeaderBasic;
