import { VStack } from "@gluestack-ui/themed";
import { HStack, Pressable, Text } from "@gluestack-ui/themed";
import React, { FC, useState } from "react";
import { SvgProps } from "react-native-svg";
import { AngleRightCustom } from "../svgs/svgs";

interface SettingsCardData {
  key?: number;
  onPress: () => void;
  icon?: (props: SvgProps) => React.JSX.Element;
  text: string;
  description?: string;
  isDisabled: boolean;
  isFocused: boolean;
}

interface SettingsCardProps {
  obj: SettingsCardData;
}

const SettingsCard: FC<SettingsCardProps> = (props) => {
  const { obj } = props;
  const IconComponent = obj.icon;

  const getColor = () => {
    if (obj.isDisabled) return "#C2C2C2";
    if (obj.isFocused) return "#3100AD";
    return "#404040";
  };

  return (
    <Pressable
      key={obj.key}
      onPress={obj.onPress}
      disabled={obj.isDisabled}
      borderColor={obj.isFocused ? "$primaryIndigo80" : "$neutralDark10"}
      $active-borderColor="$primaryIndigo20"
      $focus-borderColor="$primaryIndigo80"
      $disabled-borderColor="$primaryIndigo10"
      bg="$neutralWhite"
      $disabled-bg="$neutralDark5"
      borderWidth={1}
      borderRadius={10}
      px="$4"
      h={64}
      justifyContent="center"
    >
      <HStack alignItems="center" justifyContent="space-between">
        <VStack space="xs">
          <Text fontFamily="$bold" fontSize={14} color={getColor()}>
            {obj.text}
          </Text>
          {obj.description && (
            <Text
              fontSize={10}
              color={obj.isDisabled ? "$neutralDark15" : "$neutralDark60"}
            >
              {obj.description}
            </Text>
          )}
        </VStack>

        {IconComponent ? (
          <IconComponent color={getColor()} />
        ) : (
          <AngleRightCustom color={getColor()} />
        )}
      </HStack>
    </Pressable>
  );
};

export default SettingsCard;
