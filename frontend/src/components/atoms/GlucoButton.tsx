import React, { FC } from "react";
import { HStack, Icon, Button, ButtonText } from "@gluestack-ui/themed";
import { SvgProps } from "react-native-svg";

interface GlucoButtonProps {
  buttonType: "primary" | "secondary";
  text: string;
  isDisabled: boolean;
  onPress: () => void;
  icon?: (props: SvgProps) => React.JSX.Element;
  flex?: 1 | 0;
  style?: {};
}

const GlucoButton: FC<GlucoButtonProps> = (props) => {
  const {
    buttonType,
    text,
    isDisabled,
    onPress,
    icon,
    flex = 0,
    style,
  } = props;

  const buttonStyles = {
    primary: {
      bg: "$primaryIndigo60",
      color: "$neutralWhite",
      borderWidth: 0,
      $active: {
        bg: "$primaryIndigo50",
        color: "$neutralWhite",
      },
      $focus: {
        bg: "$primaryIndigo80",
        color: "$neutralWhite",
      },
      $disabled: {
        bg: "$neutralDark5",
        color: "$neutralDark15",
      },
    },
    secondary: {
      bg: "$primaryIndigo5",
      color: "$neutralDark90",
      borderColor: "$primaryIndigo60",
      borderWidth: 1,
      $active: {
        bg: "$neutralWhite",
        color: "$primaryIndigo50",
        borderColor: "$primaryIndigo50",
      },
      $focus: {
        bg: "$neutralWhite",
        color: "$primaryIndigo80",
        borderColor: "$primaryIndigo80",
      },
      $disabled: {
        bg: "$neutralWhite",
        color: "$neutralDark15",
        borderColor: "$neutralDark5",
      },
    },
  };

  const currentStyle = buttonStyles[buttonType];

  return (
    <Button
      borderRadius="$full"
      flex={flex}
      isDisabled={isDisabled}
      onPress={onPress}
      {...currentStyle}
      style={style}
    >
      <HStack space="sm" alignItems="center">
        {icon && <Icon as={icon} color={currentStyle.color} />}
        <ButtonText
          fontFamily="$bold"
          color={currentStyle.color}
          $active-color={currentStyle.$active.color}
          $focus-color={currentStyle.$focus.color}
          $disabled-color={currentStyle.$disabled.color}
        >
          {text}
        </ButtonText>
      </HStack>
    </Button>
  );
};

export default GlucoButton;
