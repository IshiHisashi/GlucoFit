import {
  Box,
  Pressable,
  Text,
  HStack,
  VStack,
  Image,
} from "@gluestack-ui/themed";
import React, { FC } from "react";

// react native image picker
// https://github.com/react-native-image-picker/react-native-image-picker

interface ProfileCardProps {
  name: string;
  profileImageUrl: string;
  onPressProfileCard: () => void;
  onPressProfilePic: () => void;
}

const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { name, profileImageUrl, onPressProfileCard, onPressProfilePic } =
    props;

  return (
    <Pressable
      borderColor="$primaryIndigo10"
      borderWidth={1}
      borderRadius={10}
      px="$4"
      h={90}
      onPress={onPressProfileCard}
      justifyContent="center"
      bg="$neutralWhite"
    >
      <HStack alignItems="center" space="lg">
        <Pressable onPress={onPressProfilePic}>
          <Box
            width={44}
            height={44}
            borderRadius="$full"
            bg="$primaryIndigo30"
            justifyContent="center"
            alignItems="center"
          >
            {profileImageUrl && (
              <Image
                source={profileImageUrl}
                alt="alt text"
                w={40}
                h={40}
                borderRadius={20}
              />
            )}
          </Box>
        </Pressable>
        <VStack>
          <Text fontFamily="$bold" fontSize={20} color="$neutralDark90">
            {name}
          </Text>
          <Text fontSize={13} color="$neutralDark90">
            Edit Profile
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default ProfileCard;
