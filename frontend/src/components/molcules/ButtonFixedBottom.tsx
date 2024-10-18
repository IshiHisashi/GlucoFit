import { Box, Button, ButtonText } from "@gluestack-ui/themed";
import React, { FC } from "react";

interface ButtonFixedBottomProps {
  onPress: () => void;
  isDisabled: boolean;
  text: string;
}

const ButtonFixedBottom: FC<ButtonFixedBottomProps> = (props) => {
  const { onPress, isDisabled, text } = props;

  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      p="$4"
      pb="$8"
      bg="$white"
    >
      <Button onPress={onPress} isDisabled={isDisabled}>
        <ButtonText>{text}</ButtonText>
      </Button>
    </Box>
  );
};

export default ButtonFixedBottom;
