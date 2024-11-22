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
                  bg="$primaryIndigo5"
                  borderWidth={1}
                  borderColor="$primaryIndigo30"
                  p={10}
                  rounded={10}
                  width={280}
                  height={80}
                  zIndex={0}
                  shadowColor="#220476"
                  shadowOffset={{ width: 0, height: 3 }}
                  shadowOpacity={0.1}
                  shadowRadius={4.2}
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
                  bg="$primaryIndigo5"
                  borderRightColor="$primaryIndigo30"
                  borderRightWidth={1}
                  borderBottomColor="$primaryIndigo30"
                  borderBottomWidth={1}
                  h={23}
                  w={23}
                  position="absolute"
                  top={68}
                  right={118.8}
                  transform="rotate(45deg)"
                  zIndex={10}
                />
              </VStack>
              {/* Icon image */}
              <Image
                source={require("../../../assets/OnbordingChar.png")}
                resizeMode="contain"
                alt="Character is winking during the onboarding process"
                bottom={30}
                left={250}
              />
            </View>
          )}
          <View paddingLeft={28} marginBottom={40}>
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
