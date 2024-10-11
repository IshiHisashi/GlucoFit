import React, { FC } from "react";
import { HStack, Icon, Button, ButtonText } from "@gluestack-ui/themed";
import { SvgProps } from "react-native-svg";

interface GlucoButtonProps {
  text: string;
  isDisabled: boolean;
  onPress: () => void;
  icon?: (props: SvgProps) => React.JSX.Element;
  flex?: 1 | 0;
  style?: {};
}

const GlucoButton: FC<GlucoButtonProps> = (props) => {
  const { text, isDisabled, onPress, icon, flex = 0, style } = props;
  return (
    <Button
      borderRadius="$full"
      bg="$primary500"
      $active-backgroundColor="$primary400"
      $disabled-backgroundColor="$primary300"
      flex={flex}
      isDisabled={isDisabled}
      onPress={onPress}
      style={style}
    >
      <HStack space="sm" alignItems="center">
        {icon && <Icon as={icon} color="$white" />}
        <ButtonText>{text}</ButtonText>
      </HStack>
    </Button>
  );
};

export default GlucoButton;
