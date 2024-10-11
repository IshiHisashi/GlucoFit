import {
  Badge,
  BadgeText,
  Text,
  Pressable,
  Box,
  HStack,
  Icon,
  VStack,
} from "@gluestack-ui/themed";
import React, { FC } from "react";
import { SvgProps } from "react-native-svg";

interface LabelBadgeProps {
  text: string;
  isSelected: boolean;
}

const LabelBadge: FC<LabelBadgeProps> = ({ text, isSelected }) => {
  return (
    <Badge
      bg="$white"
      borderColor={isSelected ? "$black" : "$trueGray300"}
      borderWidth={1}
      p="$1"
    >
      <BadgeText
        color={isSelected ? "$black" : "$trueGray300"}
        textTransform="none"
      >
        {text}
      </BadgeText>
    </Badge>
  );
};

interface ListCardProps {
  text: string;
  isSelected: boolean;
  iconLeft?: (props: SvgProps) => React.JSX.Element;
  iconRightOn?: (props: SvgProps) => React.JSX.Element;
  iconRightOff?: (props: SvgProps) => React.JSX.Element;
  badge?: string[];
  onPressIconRight?: () => void;
}

const ListCard: FC<ListCardProps> = (props) => {
  const {
    text,
    isSelected,
    iconLeft,
    iconRightOn,
    iconRightOff,
    badge,
    onPressIconRight,
  } = props;

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      borderWidth={1}
      borderColor="$borderLight200"
      borderRadius="$md"
      p="$4"
    >
      <HStack space="sm" alignItems="center">
        <Box
          width={40}
          height={40}
          borderRadius="$full"
          bg="#E0E0E0"
          justifyContent="center"
          alignItems="center"
        >
          <Icon as={iconLeft} size="md" />
        </Box>

        <VStack space="xs">
          <Text
            fontWeight="$bold"
            color={isSelected ? "$black" : "$trueGray300"}
          >
            {text}
          </Text>

          {badge && (
            <HStack space="sm">
              {badge.map((text) => (
                <LabelBadge text={text} isSelected={isSelected} />
              ))}
            </HStack>
          )}
        </VStack>
      </HStack>

      {iconRightOn && iconRightOff && (
        <Pressable onPress={onPressIconRight}>
          <Icon as={isSelected ? iconRightOn : iconRightOff} />
        </Pressable>
      )}
    </HStack>
  );
};

export default ListCard;
