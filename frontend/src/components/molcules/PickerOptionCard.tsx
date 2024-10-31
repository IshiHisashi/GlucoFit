import { Box, HStack, Text, Pressable, Icon } from "@gluestack-ui/themed";

import React, { FC, useState } from "react";
import { SvgProps } from "react-native-svg";
import { CheckCustom } from "../svgs/svgs";

interface PickerOptionCardProps {
  key?: number;
  onPress: () => void;
  icon?: (props: SvgProps) => React.JSX.Element;
  text: string;
  isSelected: boolean;
}

const PickerOptionCard: FC<PickerOptionCardProps> = (props) => {
  const { key, onPress, icon: IconComponent, text, isSelected } = props;

  const [isPressed, setIsPressed] = useState(false);
  const getTextColor = () => {
    if (isPressed) return "$primaryIndigo60";
    return "$neutralDark60";
  };

  return (
    <Pressable
      key={key}
      onPress={onPress}
      borderColor={isSelected ? "$primaryIndigo20" : "$neutralDark10"}
      $active-borderColor="$primaryIndigo60"
      borderWidth={1}
      borderRadius={10}
      px="$4"
      h={60.5}
      justifyContent="center"
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space="md">
          {IconComponent && (
            <Box
              width={35}
              height={35}
              borderRadius="$full"
              bg="#E0E0E0"
              justifyContent="center"
              alignItems="center"
            >
              <IconComponent />
            </Box>
          )}
          <Text fontFamily="$bold" fontSize={14} color={getTextColor()}>
            {text}
          </Text>
        </HStack>

        {isSelected && (
          <Box
            width={30}
            height={30}
            borderRadius="$full"
            bg="$primaryIndigo10"
            justifyContent="center"
            alignItems="center"
          >
            <CheckCustom color="#4800FF" size={20} />
          </Box>
        )}
      </HStack>
    </Pressable>
  );
};

export default PickerOptionCard;
