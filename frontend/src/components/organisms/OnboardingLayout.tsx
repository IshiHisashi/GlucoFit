import React, { PropsWithChildren } from "react";
import { View, Text, Button, ButtonText, Image } from "@gluestack-ui/themed";

type OnboardingLayoutProps = {
  comment?: string;
  supplimentalComment?: string;
  btnText?: string;
  onPress?: () => void;
  addLater?: boolean;
};

const OnbordingLayout: React.FC<PropsWithChildren<OnboardingLayoutProps>> = (
  props
) => {
  const {
    comment,
    supplimentalComment,
    btnText = "Continue",
    addLater = false,
    onPress,
    children,
  } = props;
  return (
    <View p={16} flexDirection="column" gap={16} height="100%">
      <Text textAlign="center">Progress bar</Text>
      <Text textAlign="center">{comment}</Text>
      <Image
        source={require("../../../assets/OnbordingChar.png")}
        resizeMode="contain"
        mx="auto"
        alt="Character is winking during the onboarding process"
      />
      <Text fontSize={12} textAlign="center">
        {supplimentalComment}
      </Text>
      {children}
      <View position="absolute" bottom={30} width="100%">
        <Button width="100%" left={16} onPress={onPress}>
          <ButtonText>{btnText}</ButtonText>
        </Button>
        {addLater && (
          <Text textAlign="center" pl={32} py={8}>
            Add later
          </Text>
        )}
      </View>
    </View>
  );
};

export default OnbordingLayout;
