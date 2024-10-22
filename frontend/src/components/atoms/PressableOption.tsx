import React, { type PropsWithChildren } from "react";
import { Text, Pressable } from "@gluestack-ui/themed";

type InputProps = {
  label: string;
  value: string;
  selectedOption: string;
  onSelect: (value: string) => void;
};

const PressableOption: React.FC<PropsWithChildren<InputProps>> = (props) => {
  const { children, selectedOption, onSelect, value, label } = props;
  const isSelected = selectedOption === value;

  return (
    <Pressable
      borderWidth={1}
      borderColor={isSelected ? "blue" : "gray"}
      backgroundColor={isSelected ? "blue" : "white"}
      p={16}
      borderRadius={8}
      onPress={() => onSelect(value)}
    >
      <Text color={isSelected ? "white" : "black"}>{label}</Text>
      {children}
    </Pressable>
  );
};

export default PressableOption;
