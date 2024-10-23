import React, { PropsWithChildren } from "react";
import {
  View,
  Box,
  Icon,
  Text,
  Button,
  ButtonText,
  Image,
  Progress,
  ProgressFilledTrack,
} from "@gluestack-ui/themed";

type OnboardingLayoutProps = {
  comment?: string;
  supplimentalComment?: string;
  btnText?: string;
  progressValue?: number;
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
    progressValue,
    onPress,
    children,
  } = props;
  return (
    <View>
      <Progress
        position="absolute"
        top={0}
        size="sm"
        width="100%"
        bg="#CCB7FF"
        value={progressValue}
      >
        <ProgressFilledTrack bg="#4800FF" />
      </Progress>
      <View p={16} flexDirection="column" gap={16} height="100%">
        <Text textAlign="center">{comment}</Text>
        {/* <CommentBox /> */}
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
    </View>
  );
};

export default OnbordingLayout;

const CommentBox = () => {
  return (
    <Box alignItems="center" justifyContent="center" position="relative">
      {/* Tooltip-like box with text */}
      <Box
        bg="#F1EAFE"
        padding="16px"
        borderRadius="10px"
        position="relative"
        shadow="4"
        width="250px"
      >
        <Text fontSize="16px" color="#4800FF" textAlign="center">
          Let’s start with your personal details for smarter insights
        </Text>

        {/* Triangle at the bottom center */}
        <Box
          position="absolute"
          bottom={-10}
          left="50%"
          transform={[{ translateX: -10 }]}
          width={0}
          height={0}
          borderLeftWidth={10}
          borderRightWidth={10}
          borderBottomWidth={10}
          borderLeftColor="transparent"
          borderRightColor="transparent"
          borderBottomColor="#F1EAFE"
        />
      </Box>

      {/* Icon below the tooltip */}
      <Box marginTop="20px">
        <Icon name="cube" color="#4800FF" size={48} />
      </Box>
    </Box>
  );
};
