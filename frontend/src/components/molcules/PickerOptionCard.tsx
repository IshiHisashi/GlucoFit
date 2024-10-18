import { Box, HStack, Text, Pressable, Icon } from "@gluestack-ui/themed";

import React, { FC } from "react";
import { SvgProps } from "react-native-svg";

interface PickerOptionCardProps {
  key?: number;
  onPress: () => void;
  icon: (props: SvgProps) => React.JSX.Element;
  text: string;
  isSelected: boolean;
}

const PickerOptionCard: FC<PickerOptionCardProps> = (props) => {
  const { key, onPress, icon, text, isSelected } = props;

  return (
    <Pressable
      key={key}
      onPress={onPress}
      borderColor={isSelected ? "#808080" : "#E0E0E0"}
      borderWidth={1}
      borderRadius="$md"
      p="$4"
    >
      <HStack alignItems="center" space="sm">
        <Box
          width={40}
          height={40}
          borderRadius="$full"
          bg="#E0E0E0"
          justifyContent="center"
          alignItems="center"
        >
          <Icon as={icon} size="md" />
        </Box>
        <Text>{text}</Text>
      </HStack>
    </Pressable>
  );
};

export default PickerOptionCard;
