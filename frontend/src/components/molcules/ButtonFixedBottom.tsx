import { Box, Button, ButtonText } from "@gluestack-ui/themed";
import React, { FC } from "react";

import GlucoButton from "../atoms/GlucoButton";

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
      // pb="$8"
      bg="$white"
    >
      <GlucoButton
        buttonType="primary"
        text={text}
        isFocused={false}
        isDisabled={isDisabled}
        onPress={onPress}
      />
    </Box>
  );
};

export default ButtonFixedBottom;
