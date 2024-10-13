import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import { View } from "@gluestack-ui/themed";
// import { Audio } from "expo-av"; // for audio feedback (click sound as you scroll)
// import * as Haptics from "expo-haptics"; // for haptic feedback

import React, { useState } from "react";

const DurationPicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState<string | null>(null);

  return (
    <View
      style={{
        backgroundColor: "#F1F1F1",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TimerPicker
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
    </View>
  );
};

export default DurationPicker;
