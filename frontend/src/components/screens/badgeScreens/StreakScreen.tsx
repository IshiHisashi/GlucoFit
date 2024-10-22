import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import WeeklyStreak from "../../organisms/WeeklyStreak";
import CalenderStreak from "../../organisms/CalenderStreak";
import ProgressBudge from "../../organisms/ProgressBudge";

const StreakScreen: React.FC = () => {
  return (
    <View flexDirection="column" gap={20}>
      {/* Icon */}
      <WeeklyStreak />
      <CalenderStreak />
      <ProgressBudge />
    </View>
  );
};

export default StreakScreen;
