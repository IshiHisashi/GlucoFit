import React, { useState, useEffect } from "react";
import { View, Text } from "@gluestack-ui/themed";

const WeeklyStreak: React.FC = () => {
  const [daysHasLog, setDaysHasLog] = useState<string[]>(["1", "2"]);

  const getLast7Days = (): string[] => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  };

  const getDayOfWeek = (dateString: string): string => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  useEffect(() => {
    // fetch graphQL
    setDaysHasLog(["2024-10-06", "2024-10-07", "2024-10-09"]);
  }, []);

  const last7Days = getLast7Days();
  console.log(last7Days);
  return (
    <View
      borderColor="#ccc"
      borderWidth={1}
      rounded={10}
      padding={10}
      flexDirection="column"
      gap={10}
    >
      <Text fontSize={20} fontWeight="$semibold">
        Weekly Streak
      </Text>
      <View flexDirection="row" gap={10}>
        {last7Days.map((day) => (
          <View key={day}>
            <Text>{daysHasLog.includes(day) ? "Yes" : "No"}</Text>
            <Text>{getDayOfWeek(day).substring(0, 3)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeeklyStreak;

const DayStreak: React.FC = () => {
  return (
    <View>
      <Text>Icon</Text>
      <Text>Day</Text>
    </View>
  );
};
