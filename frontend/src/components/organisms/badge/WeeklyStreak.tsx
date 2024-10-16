import React, { useState, useEffect } from "react";
import { View, Text } from "@gluestack-ui/themed";

const getLast7Days = (): string[] => {
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const currentDay = new Date(today);
    currentDay.setDate(today.getDate() - i);
    const formattedDate = currentDay.toLocaleDateString("en-CA");
    days.push(formattedDate);
  }
  return days;
};
const getDayOfWeek = (dateString: string): string => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};

const WeeklyStreak: React.FC = () => {
  const [daysHasLog, setDaysHasLog] = useState<string[]>(["1", "2"]);

  useEffect(() => {
    // fetch graphQL

    // HardCord for now
    setDaysHasLog(["2024-10-06", "2024-10-12", "2024-10-15"]);
  }, []);

  const last7Days = getLast7Days();
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
      <View flexDirection="row" gap={10} justifyContent="space-between">
        {last7Days.map((day) => (
          <View key={day}>
            <Text textAlign="center">
              {daysHasLog.includes(day) ? "Yes" : "No"}
            </Text>
            <Text textAlign="center">{getDayOfWeek(day).substring(0, 3)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeeklyStreak;
