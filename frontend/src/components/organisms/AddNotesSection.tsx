import { HStack, Icon, Pressable, Text, VStack } from "@gluestack-ui/themed";
import React, { FC } from "react";
import { PlusDark } from "../svgs/svgs";

interface AddNotesSectionProps {
  onPress: () => void;
  noteExcerpt: string;
}

const AddNotesSection: FC<AddNotesSectionProps> = (props) => {
  const { onPress, noteExcerpt } = props;

  return (
    <VStack
      space="sm"
      mt="$4"
      borderWidth={1}
      borderColor="$borderLight200"
      borderRadius="$md"
    >
      <HStack alignItems="center" justifyContent="space-between" p="$3">
        <Text fontSize="$lg" fontWeight="$bold">
          Add Notes
        </Text>
        <Pressable onPress={onPress}>
          <Icon as={PlusDark} size="sm" mr="$2" />
        </Pressable>
      </HStack>
      <Pressable
        onPress={onPress}
        disabled={noteExcerpt === ""}
        borderTopWidth={1}
        borderTopColor="$borderLight200"
      >
        <HStack alignItems="center" p="$3">
          <Text color={noteExcerpt ? "#000000" : "#808080"}>
            {noteExcerpt || "No notes to display"}
          </Text>
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default AddNotesSection;
