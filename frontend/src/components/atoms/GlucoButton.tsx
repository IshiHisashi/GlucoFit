import React, { FC, useState } from "react";
import { HStack, Icon, Button, ButtonText } from "@gluestack-ui/themed";
import { SvgProps } from "react-native-svg";

interface GlucoButtonProps {
  buttonType: "primary" | "secondary";
  text: string;
  isFocused: boolean;
  isDisabled: boolean;
  onPress: () => void;
  icon?: FC<SvgProps>;
  buttonSize?: "small" | "medium";
  flex?: 1 | 0;
  style?: {};
}

const GlucoButton: FC<GlucoButtonProps> = (props) => {
  const {
    buttonType,
    text,
    isFocused,
    isDisabled,
    onPress,
    icon: IconComponent,
    buttonSize,
    flex = 0,
    style,
  } = props;

  const [isPressed, setIsPressed] = useState(false);

  const buttonStyles = {
    primary: {
      bg: "$primaryIndigo60",
      color: "$neutralWhite",
      colorForSvg: "#ffffff",
      borderWidth: 0,
      $active: {
        bg: "$primaryIndigo50",
        color: "$neutralWhite",
        colorForSvg: "#ffffff",
      },
      $focus: {
        bg: "$primaryIndigo80",
        color: "$neutralWhite",
        colorForSvg: "#ffffff",
      },
      $disabled: {
        bg: "$neutralDark5",
        color: "$neutralDark15",
        colorForSvg: "#C2C2C2",
      },
    },
    secondary: {
      bg: "$primaryIndigo5",
      color: "$neutralDark90",
      colorForSvg: "#141414",
      borderColor: "$primaryIndigo60",
      borderWidth: 1,
      $active: {
        bg: "$neutralWhite",
        color: "$primaryIndigo50",
        colorForSvg: "#692EFF",
        borderColor: "$primaryIndigo50",
      },
      $focus: {
        bg: "$neutralWhite",
        color: "$primaryIndigo80",
        colorForSvg: "#3100AD",
        borderColor: "$primaryIndigo80",
      },
      $disabled: {
        bg: "$neutralWhite",
        color: "$neutralDark15",
        colorForSvg: "#C2C2C2",
        borderColor: "$neutralDark5",
      },
    },
  };

  const currentStyle = buttonStyles[buttonType];

  const getIconColor = () => {
    if (isDisabled) return currentStyle.$disabled.colorForSvg;
    if (isPressed) return currentStyle.$active.colorForSvg;
    if (isFocused) return currentStyle.$focus.colorForSvg;
    return currentStyle.colorForSvg;
  };

  return (
    <Button
      borderRadius="$full"
      width={
        buttonSize === "small" ? 110 : buttonSize === "medium" ? 214 : "$auto"
      }
      // maxWidth={347}
      flex={flex}
      isDisabled={isDisabled}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...currentStyle}
      style={style}
    >
      <HStack space="sm" alignItems="center">
        {IconComponent && <IconComponent color={getIconColor()} />}
        <ButtonText
          fontFamily="$bold"
          fontSize={buttonSize === "small" ? 14 : 17}
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
