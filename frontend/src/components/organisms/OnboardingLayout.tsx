import React, { PropsWithChildren } from "react";
import {
  View,
  Text,
  Box,
  VStack,
  Image,
  Progress,
  ProgressFilledTrack,
} from "@gluestack-ui/themed";
import GlucoButton from "../atoms/GlucoButton";

type OnboardingLayoutProps = {
  comment?: string;
  supplimentalComment?: string;
  btnText?: string;
  progressValue?: number;
  onPress?: () => void;
  character?: boolean;
  addLater?: boolean;
  disabled?: boolean;
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
    character,
    disabled = "false",
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
      <View px={16} flexDirection="column" height="100%">
        <Text
          fontSize="$3xl"
          my={30}
          fontFamily="$bold"
          color="$primaryIndigo90"
        >
          {comment}
        </Text>
        {children}
        <View position="absolute" bottom={30} width="100%">
          {/* Tooltip */}
          {character && (
            <View>
              <VStack space="sm" alignItems="center" bottom={40}>
                <Box
                  bg="#FAF8FF"
                  p={10}
                  rounded={10}
                  width={280}
                  height={80}
                  // style={{
                  //   shadowColor: "#000",
                  //   shadowOffset: { width: 0, height: 1 },
                  //   shadowOpacity: 0.25,
                  //   shadowRadius: 3.84,
                  //   elevation: 5,
                  // }}
                  zIndex={0}
                >
                  <Text
                    color="$neutralDark80"
                    fontSize={14}
                    fontFamily="$bold"
                    textAlign="center"
                  >
                    {supplimentalComment}
                  </Text>
                </Box>
                <Box
                  bg="#FAF8FF"
                  h={23}
                  w={23}
                  position="absolute"
                  top={70}
                  right={120}
                  transform="rotate(45deg)"
                  zIndex={10}
                />
              </VStack>
              {/* Icon image */}
              <Image
                source={require("../../../assets/OnbordingChar.png")}
                resizeMode="contain"
                // mx="auto"
                alt="Character is winking during the onboarding process"
                bottom={30}
                left={250}
              />
            </View>
          )}
          <View paddingLeft={28}>
            <GlucoButton
              buttonType="primary"
              text="Continue"
              isFocused={false}
              isDisabled={disabled ? true : false}
              onPress={onPress}
            />
          </View>

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