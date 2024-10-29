import { Pressable, Text, HStack } from "@gluestack-ui/themed";
import React, { FC, useState } from "react";
import { SvgProps } from "react-native-svg";

interface GlucoButtonNoOutlineProps {
  text: string;
  isFocused: boolean;
  isDisabled: boolean;
  onPress: () => void;
  iconLeft?: FC<SvgProps>;
  iconRight?: FC<SvgProps>;
  buttonSize?: "small";
  styleForPressable?: {};
  styleForHstack?: {};
  styleForText?: {};
}

const GlucoButtonNoOutline: FC<GlucoButtonNoOutlineProps> = (props) => {
  const {
    text,
    isFocused,
    isDisabled,
    onPress,
    iconLeft: IconComponentLeft,
    iconRight: IconComponentRight,
    buttonSize,
    styleForPressable,
    styleForHstack,
    styleForText,
  } = props;

  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = {
    color:
      IconComponentLeft || IconComponentRight
        ? "$neutralDark90"
        : "$primaryIndigo80",
    colorForSvg: "#3100AD",
    fontSize:
      IconComponentLeft || IconComponentRight
        ? 16
        : buttonSize === "small"
          ? 14
          : 17,
    sizeForSvg: buttonSize === "small" ? 20 : 24,
    $active: {
      color: "$primaryIndigo50",
      colorForSvg: "#692EFF",
      borderBottomColor:
        IconComponentLeft || IconComponentRight ? null : "$primaryIndigo60",
      borderBottomWidth: IconComponentLeft || IconComponentRight ? 0 : 1,
    },
    $focus: {
      color: "$primaryIndigo100",
      colorForSvg: "#1A005C",
      borderBottomColor:
        IconComponentLeft || IconComponentRight ? null : "$primaryIndigo100",
      borderBottomWidth: IconComponentLeft || IconComponentRight ? 0 : 1,
    },
    $disabled: {
      color: "$neutralDark15",
      colorForSvg: "#C2C2C2",
    },
  };

  const getIconColor = () => {
    if (isDisabled) return buttonStyle.$disabled.colorForSvg;
    if (isPressed) return buttonStyle.$active.colorForSvg;
    if (isFocused) return buttonStyle.$focus.colorForSvg;
    return buttonStyle.colorForSvg;
  };

  const getTextColor = () => {
    if (isDisabled) return buttonStyle.$disabled.color;
    if (isPressed) return buttonStyle.$active.color;
    if (isFocused) return buttonStyle.$focus.color;
    return buttonStyle.color;
  };

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...buttonStyle}
      style={styleForPressable}
    >
      <HStack space="sm" alignItems="center" style={styleForHstack}>
        {IconComponentLeft && (
          <IconComponentLeft
            color={getIconColor()}
            size={buttonStyle.sizeForSvg}
          />
        )}
        <Text
          fontFamily="$bold"
          fontSize={buttonStyle.fontSize}
          color={getTextColor()}
          style={styleForText}
        >
          {text}
        </Text>
        {IconComponentRight && (
          <IconComponentRight
            color={getIconColor()}
            size={buttonStyle.sizeForSvg}
          />
        )}
      </HStack>
    </Pressable>
  );
};

export default GlucoButtonNoOutline;
