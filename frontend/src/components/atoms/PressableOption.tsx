import React, { type PropsWithChildren } from "react";
import { View, Text, Pressable, Image } from "@gluestack-ui/themed";

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
      borderColor={isSelected ? "#8A5CFF" : "white"}
      backgroundColor={isSelected ? "#FAF8FF" : "white"}
      px={16}
      py={14}
      borderRadius={8}
      onPress={() => onSelect(value)}
    >
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={isSelected ? "#3100AD" : "black"}>{label}</Text>
        {isSelected && (
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
