import React, { FC, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { styled } from "@gluestack-style/react";

const StyledContainer = styled(View, {
  // borderWidth: 1,
  // borderColor: "#E4E4E7",
  borderRadius: 100,
  // padding: 4,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "transparent",
  height: 31,
  width: 51,
  position: "relative",
});

const StyledThumb = styled(Animated.View, {
  width: 27,
  height: 27,
  borderRadius: 13.5,
  backgroundColor: "white",
  // shadowColor: "#000",
  // shadowOffset: {
  //   width: 0,
  //   height: 2,
  // },
  // shadowOpacity: 0.25,
  // shadowRadius: 3.84,
  // elevation: 5,
});

interface ToggleProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}

const Toggle: FC<ToggleProps> = (props) => {
  const { isEnabled, onToggle } = props;

  const [enabled, setEnabled] = useState(isEnabled);
  const thumbAnim = useState(new Animated.Value(enabled ? 1 : 0))[0];

  const toggleSwitch = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onToggle(newValue);

    Animated.spring(thumbAnim, {
      toValue: newValue ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  const translateX = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 21],
  });

  return (
    <Pressable onPress={toggleSwitch}>
      <StyledContainer
        style={{
          backgroundColor: enabled ? "#4800FF" : "#E0E0E0",
        }}
      >
        <StyledThumb
          style={{
            transform: [{ translateX }],
          }}
        />
      </StyledContainer>
    </Pressable>
  );
};

export default Toggle;
