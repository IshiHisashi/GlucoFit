import React, { type PropsWithChildren } from "react";
import { View, Text, Pressable, Image } from "@gluestack-ui/themed";

type InputProps = {
  label: string;
  value: string;
  selectedOption: string | number | boolean | undefined;
  onSelect: (value: string) => void;
  withoutCheck: boolean;
  needOutLine: boolean;
};

const PressableOption: React.FC<PropsWithChildren<InputProps>> = (props) => {
  const {
    children,
    selectedOption,
    onSelect,
    value,
    label,
    withoutCheck = false,
    needOutLine = false,
  } = props;
  const isSelected = selectedOption === value;

  return (
    <Pressable
      borderWidth={1}
      borderColor={isSelected ? "#8A5CFF" : needOutLine ? "#ECE5FF" :"white"}
      backgroundColor={isSelected ? "#FAF8FF" : "white"}
      px={16}
      py={14}
      borderRadius={8}
      onPress={() => onSelect(value)}
    >
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent={withoutCheck ? "center" : "space-between"}
      >
        <Text color={isSelected ? "#3100AD" : "black"}>{label}</Text>
        {isSelected && !withoutCheck && (
          <Image
            source={require("../../../assets/checkmark.png")}
            resizeMode="contain"
            w={15}
            h={10}
            alt="check mark"
          />
        )}
      </View>
      {children}
    </Pressable>
  );
};

export default PressableOption;
