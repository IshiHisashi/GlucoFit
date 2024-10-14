import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
// import { Audio } from "expo-av"; // for audio feedback (click sound as you scroll)
// import * as Haptics from "expo-haptics"; // for haptic feedback
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, ButtonText, VStack } from "@gluestack-ui/themed";

interface DurationPickerProps {
  value: { hours: number; minutes: number };
  setValue: Dispatch<SetStateAction<{ hours: number; minutes: number }>>;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const DurationPicker: FC<DurationPickerProps> = (props) => {
  const { value, setValue, onClose } = props;

  const [duration, setDuration] = useState({
    hours: value.hours,
    minutes: value.minutes,
  });

  const handleDurationChange = (newDuration: {
    hours: number;
    minutes: number;
  }) => {
    setDuration({
      hours: newDuration.hours,
      minutes: newDuration.minutes,
    });
  };

  return (
    <VStack
      bg="#ffffff"
      space="md"
      // alignItems="center"
      // justifyContent="center"
    >
      <TimerPicker
        onDurationChange={handleDurationChange}
        initialValue={duration}
        padWithNItems={1}
        hideSeconds
        hourLabel="h"
        minuteLabel="m"
        hourLimit={{ max: 14 }}
        // Audio={Audio}
        LinearGradient={LinearGradient}
        // Haptics={Haptics}
        styles={{
          theme: undefined,
          backgroundColor: "#ffffff",
          pickerItem: {
            fontSize: 34,
          },
          pickerLabel: {
            fontSize: 26,
            right: -40,
          },
          pickerLabelContainer: {
            width: 60,
          },
          pickerItemContainer: {
            width: 110,
          },
        }}
      />

      <Button
        isDisabled={duration.hours === 0 && duration.minutes === 0}
        onPress={() => {
          setValue(duration);
          onClose(false);
        }}
      >
        <ButtonText>Save</ButtonText>
      </Button>
    </VStack>
  );
};

export default DurationPicker;
