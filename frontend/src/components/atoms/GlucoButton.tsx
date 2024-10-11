import React, { FC } from "react";
import {
  HStack,
  Icon,
  Button,
  ButtonText,
  CalendarDaysIcon,
} from "@gluestack-ui/themed";

interface GlucoButtonProps {
  text: string;
  isDisabled: boolean;
  icon?: string;
  flex?: number;
}

const GlucoButton: FC<GlucoButtonProps> = (props) => {
  const { text, icon, flex = 0, isDisabled } = props;
  return (
    <Button
      borderRadius="$full"
      bg="$primary500"
      $active-backgroundColor="$primary400"
      $disabled-backgroundColor="$primary300"
      flex={flex}
      isDisabled={isDisabled}
    >
      <HStack space="sm">
        {icon && <Icon as={icon} color="$white" />}
        <ButtonText>{text}</ButtonText>
      </HStack>
    </Button>
  );
};

export default GlucoButton;
