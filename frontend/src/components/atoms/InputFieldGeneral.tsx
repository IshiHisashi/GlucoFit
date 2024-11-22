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
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { SvgProps } from "react-native-svg";
import { InfoCustom } from "../svgs/svgs";

interface InputFieldGeneralProps {
  value: any;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  isRequired: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  label?: string;
  type?: "text" | "password";
  keyboardType?: "numeric" | "email-address" | "phone-pad" | "web-search";
  placeholder?: string;
  iconLeft?: FC<SvgProps>;
  iconRight?: FC<SvgProps>;
  onIconLeftPress?: () => void;
  onIconRightPress?: () => void;
  unit?: string;
  errorMessage?: string;
}

const InputFieldGeneral: FC<InputFieldGeneralProps> = (props) => {
  const {
    value,
    onChangeText,
    onSubmitEditing,
    isRequired,
    isDisabled,
    isInvalid,
    label,
    type,
    keyboardType,
    placeholder,
    iconLeft: IconComponentLeft,
    iconRight: IconComponentRight,
    onIconLeftPress,
    onIconRightPress,
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
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                <Pressable
                  onPress={onIconLeftPress}
                  // disabled={!onIconRightPress}
                >
                  <IconComponentLeft color={getIconColor()} />
                </Pressable>
              </InputSlot>
            )}
            <InputField
              value={value}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              autoCapitalize="none"
              type={type || "text"}
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor="$neutralDark30"
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
                  <Pressable
                    onPress={onIconRightPress}
                    // disabled={!onIconRightPress}
                  >
                    <IconComponentRight color={getIconColor()} />
                  </Pressable>
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
      </TouchableWithoutFeedback>
    </>
  );
};

export default InputFieldGeneral;
