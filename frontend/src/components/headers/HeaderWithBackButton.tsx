import { Pressable, HStack, Text, View } from "@gluestack-ui/themed";
import React, { FC } from "react";
import { NavigationProp } from "@react-navigation/native";

import { AngleLeftCustom, PenCustom } from "../svgs/svgs";

interface HeaderWithBackButtonProps {
  navigation: NavigationProp<any>;
  text: string;
  rightIconOnPress?: () => void;
}

export const HeaderWithBackButton: FC<HeaderWithBackButtonProps> = (props) => {
  const { navigation, text, rightIconOnPress } = props;

  return (
    <HStack
      bg="$neutralWhite"
      // justifyContent="space-between"
      p="$4"
      space="lg"
      alignItems="center"
    >
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        width={40}
        height={32}
        alignItems="center"
        justifyContent="center"
      >
        <AngleLeftCustom color="#4800FF" size={32} />
      </Pressable>

      <Text flex={1} textAlign="center" fontFamily="$bold">
        {text}
      </Text>

      {rightIconOnPress ? (
        <Pressable
          onPress={rightIconOnPress}
          width={40}
          height={32}
          alignItems="center"
          justifyContent="center"
        >
          {text === "Add Notes" ? (
            <Text color="$primaryIndigo60">Done</Text>
          ) : (
            <PenCustom color="#4800FF" size={20} />
          )}
        </Pressable>
      ) : (
        <View width={40} height={32} />
      )}
    </HStack>
  );
};
