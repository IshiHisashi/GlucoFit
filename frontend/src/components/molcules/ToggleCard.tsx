import { Text } from "@gluestack-ui/themed";
import { HStack, Pressable, VStack } from "@gluestack-ui/themed";
import React, { FC } from "react";
import Toggle from "../atoms/Toggle";

interface ToggleCardData {
  key?: number;
  text: string;
  description?: string;
  onToggle: (value: boolean) => void;
  isEnabled: boolean;
}

interface ToggleCardProps {
  obj: ToggleCardData;
}

const ToggleCard: FC<ToggleCardProps> = (props) => {
  const { obj } = props;

  return (
    <Pressable
      key={obj.key}
      // onPress={obj.onPress}
      borderColor="$primaryIndigo10"
      bg="$neutralWhite"
      borderWidth={1}
      borderRadius={10}
      px="$4"
      h={60.5}
      justifyContent="center"
    >
      <HStack alignItems="center" justifyContent="space-between">
        <VStack space="xs">
          <Text fontFamily="$bold" fontSize={14} color="$neutralDark60">
            {obj.text}
          </Text>
          {obj.description && (
            <Text fontSize={10} color="$neutralDark60">
              {obj.description}
            </Text>
          )}
        </VStack>

        <Toggle isEnabled={obj.isEnabled} onToggle={obj.onToggle} />
      </HStack>
    </Pressable>
  );
};

export default ToggleCard;
