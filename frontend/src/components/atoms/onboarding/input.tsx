import React, { type PropsWithChildren } from "react";
import {
  View,
  Text,
  Input as InputGlueStack,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";

type InputProps = {
  labelText?: string;
  bottomText?: string;
  onChange?: (text: string) => void;
};

const Input: React.FC<PropsWithChildren<InputProps>> = (props) => {
  const { children, labelText, bottomText, onChange } = props;
  return (
    <View flexDirection="column" gap={8}>
      <Text fontSize={14} fontWeight={700}>
        {labelText}
      </Text>
      <InputGlueStack px={10}>
        <InputField onChangeText={onChange} autoCapitalize="none" />
        {children}
      </InputGlueStack>
      {bottomText && <Text fontSize={12}>{bottomText}</Text>}
    </View>
  );
};

export default Input;
