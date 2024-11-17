import { Pressable, Text, View, HStack, VStack } from "@gluestack-ui/themed";
import React, { FC, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { BellCustom, SearchCustom, TimesCustom } from "../svgs/svgs";
import InputFieldGeneral from "../atoms/InputFieldGeneral";

interface HeaderBasicProps {
  routeName: "Home" | "Insights" | "Logs" | "BadgeScreen";
  userName?: string;
  searchValue?: string;
  onChangeSearchValue?: (value: string) => void;
  onSearchExecute?: (value: string) => void;
  navigation?: NavigationProp<any>;
}

const HeaderBasic: FC<HeaderBasicProps> = (props) => {
  const {
    routeName,
    userName,
    searchValue = "",
    onSearchExecute,
    onChangeSearchValue,
    navigation,
  } = props;

  const [localSearchValue, setLocalSearchValue] = useState<string | undefined>(
    searchValue
  );

  const headerStyles = {
    Home: {
      bg: "$primaryIndigo60",
      notificationColor: "#ffffff",
    },
    Insights: {
      bg: "$neutralWhite",
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

  const handleSearch = () => {
    if (onSearchExecute) {
      onSearchExecute(localSearchValue.trim());
    }
  };

  const handleClearSearch = () => {
    setLocalSearchValue("");
    if (onChangeSearchValue) {
      onChangeSearchValue("");
    }
  };

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
            <Pressable onPress={() => navigation?.navigate("Profile")}>
              <View h="$8" w="$8" bg="#808080" borderRadius="$full" />
            </Pressable>
            <Pressable onPress={() => navigation?.navigate("Notifications")}>
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

      {(routeName === "Insights" || routeName === "BadgeScreen") && (
        <InputFieldGeneral
          value={searchValue}
          onChangeText={(text) => {
            setLocalSearchValue(text);
            if (onChangeSearchValue) {
              onChangeSearchValue(text);
            }
          }}
          onSubmitEditing={handleSearch}
          isRequired={true}
          isDisabled={false}
          isInvalid={false}
          placeholder="Search"
          iconLeft={SearchCustom}
          iconRight={TimesCustom}
          onIconRightPress={handleClearSearch}
        />
      )}
    </HStack>
  );
};

export default HeaderBasic;
