import {
  InputField,
  InputSlot,
  FormControl,
  Input,
  Text,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  HStack,
  Pressable,
} from "@gluestack-ui/themed";
import React, { FC, useState } from "react";
import { SvgProps } from "react-native-svg";
import { InfoCustom } from "../svgs/svgs";

interface InputFieldGeneralProps {
  value: string;
  onChangeText: (text: string) => void;
  isRequired: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  label?: string;
  type?: "text" | "password";
  keyboardType?: "numeric" | "email-address" | "phone-pad" | "web-search";
  placeholder?: string;
  iconLeft?: FC<SvgProps>;
  iconRight?: FC<SvgProps>;
  unit?: string;
  errorMessage?: string;
}

const InputFieldGeneral: FC<InputFieldGeneralProps> = (props) => {
  const {
    value,
    onChangeText,
    isRequired,
    isDisabled,
    isInvalid,
    label,
    type,
    keyboardType,
    placeholder,
    iconLeft: IconComponentLeft,
    iconRight: IconComponentRight,
    unit,
    errorMessage,
  } = props;

  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getIconColor = () => {
    if (isDisabled) return "#C2C2C2";
    if (isPressed) return "#414853";
    if (isFocused) return "#3100AD";
    return "#414853";
  };

  return (
    <FormControl
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      flex={1}
    >
      {label && (
        <HStack space="xs" mb="$1">
          <FormControlLabelText
            color="$neutralDark90"
            fontSize={14}
            fontFamily="$bold"
          >
            {label}
          </FormControlLabelText>
          {isRequired && (
            <Text color="$error50" fontSize={14} fontFamily="$bold">
              *
            </Text>
          )}
        </HStack>
      )}

      <Input
        variant="outline"
        size="md"
        w="$full"
        h={48}
        px="$4"
        // pr="$4"
        borderRadius={10}
        bg="$neutralWhite"
        borderColor={isPressed ? "$primaryIndigo20" : "$primaryIndigo10"}
        $active-borderColor="$primaryIndigo20"
        $focus-borderColor="$primaryIndigo80"
        // $focus-bgColor="$primaryIndigo5"
        $disabled-borderColor="$neutralDark5"
        $disabled-bgColor="$neutralDark5"
      >
        {IconComponentLeft && (
          <InputSlot>
            <IconComponentLeft color={getIconColor()} />
          </InputSlot>
        )}
        <InputField
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          type={type || "text"}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="$neutralDark60"
          fontSize={15}
          // fontFamily="$bold"
          color="$neutralDark60"
          $focus-color="$primaryIndigo80"
          $disabled-color="$neutralDark15"
          pl={4}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        />
        {(IconComponentRight || unit) && (
          <InputSlot>
            {IconComponentRight && (
              <IconComponentRight color={getIconColor()} />
            )}
            {unit && (
              <Text
                fontSize={15}
                color="$neutralDark40"
                // fontFamily="$bold"
                $disabled-color="$neutralDark15"
              >
                {unit}
              </Text>
            )}
          </InputSlot>
        )}
      </Input>

      <FormControlError>
        <HStack alignItems="center" space="xs">
          <InfoCustom color="#FF6B4D" size={24} />
          <FormControlErrorText color="$secondaryR60" fontSize={13}>
            {errorMessage}
          </FormControlErrorText>
        </HStack>
      </FormControlError>
    </FormControl>
  );
};

export default InputFieldGeneral;
