import React, { FC, useState } from "react";
import { HStack, Icon, Button, ButtonText } from "@gluestack-ui/themed";
import { SvgProps } from "react-native-svg";

interface TabProps {
  text: string;
  isFocused: boolean;
  isDisabled: boolean;
  onPress: () => void;
  iconLeft?: FC<SvgProps>;
  iconRight?: FC<SvgProps>;
  flex?: 1 | 0;
  style?: {};
}

const Tab: FC<TabProps> = (props) => {
  const {
    text,
    isFocused,
    isDisabled,
    onPress,
    iconLeft: IconComponentLeft,
    iconRight: IconComponentRight,
    flex = 0,
    style,
  } = props;

  const [isPressed, setIsPressed] = useState(false);

  const customStyle = {
    bg: "$neutralWhite",
    color: "$neutralDark60",
    colorForSvg: "#404040",
    borderColor: "$primaryIndigo10",
    borderWidth: 1,
    $active: {
      bg: "$neutralWhite",
      color: "$neutralDark60",
      colorForSvg: "#404040",
      borderColor: "$primaryIndigo20",
    },
    $focus: {
      bg: "$primaryIndigo5",
      color: "$primaryIndigo80",
      colorForSvg: "#3100AD",
      borderColor: "$primaryIndigo80",
    },
    $disabled: {
      bg: "$neutralDark5",
      color: "$neutralDark15",
      colorForSvg: "#C2C2C2",
      borderColor: "$neutralDark5",
    },
  };

  const getIconColor = () => {
    if (isDisabled) return customStyle.$disabled.colorForSvg;
    if (isPressed) return customStyle.$active.colorForSvg;
    if (isFocused) return customStyle.$focus.colorForSvg;
    return customStyle.colorForSvg;
  };

  return (
    <Button
      borderRadius={10}
      py={8}
      px={12}
      flex={flex}
      isDisabled={isDisabled}
      isFocused={isFocused}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...customStyle}
      style={style}
    >
      <HStack space="xs" alignItems="center">
        {IconComponentLeft && (
          <IconComponentLeft color={getIconColor()} size={20} />
        )}
        <ButtonText
          fontFamily="$bold"
          fontSize={12}
          color={customStyle.color}
          $active-color={customStyle.$active.color}
          $focus-color={customStyle.$focus.color}
          $disabled-color={customStyle.$disabled.color}
        >
          {text}
        </ButtonText>
        {IconComponentRight && (
          <IconComponentRight color={getIconColor()} size={20} />
        )}
      </HStack>
    </Button>
  );
};

export default Tab;
