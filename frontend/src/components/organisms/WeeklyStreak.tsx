import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image } from "@gluestack-ui/themed";
import { useQuery } from "@apollo/client";
import { GET_STREAK_LAST_7_DAYS } from "../../utils/query/badgeProgressQuery";
import { AuthContext } from "../../context/AuthContext";

const getLast7Days = (): string[] => {
  const days = [];
  const today = new Date();
  const { userId } = useContext(AuthContext);

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

  const today = new Date();
  const sixDaysAgo = new Date(today);
  sixDaysAgo.setDate(today.getDate() - 6);

  function getMonthName(monthNumber: number) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthNames[monthNumber - 1] || "Invalid month";
  }

  // fetch graphQL
  const { loading, error, data } = useQuery(GET_STREAK_LAST_7_DAYS, {
    variables: { userId: userId },
  });
  console.log(data);

  useEffect(() => {
    setDaysHasLog(data?.getTestResultsLast7Days);
  }, [data]);

  const last7Days = getLast7Days();
  return (
    <View
      borderColor="#ccc"
      borderWidth={1}
      rounded={10}
      padding={20}
      flexDirection="column"
      backgroundColor="white"
      marginTop={16}
    >
      <Text fontSize={20} fontWeight="$semibold" color="black">
        Weekly Streak
      </Text>
      <Text marginBottom={20}>
        {getMonthName(sixDaysAgo.getMonth())} {sixDaysAgo.getDate()} -{" "}
        {getMonthName(today.getMonth())} {today.getDate()}.{" "}
        {today.getFullYear()}
      </Text>
      <View flexDirection="row" gap={10} justifyContent="space-between">
        {last7Days.map((day) => (
          <View key={day}>
            <Text textAlign="center">
              {daysHasLog?.includes(day) ? (
                <Image
                  width={32}
                  height={32}
                  source={require("../../../assets/icons/check.png")}
                  alt="checked"
                />
              ) : (
                <Image
                  width={32}
                  height={32}
                  source={require("../../../assets/icons/blank_check.png")}
                  alt="not checked"
                />
              )}
            </Text>
            <Text textAlign="center">{getDayOfWeek(day).substring(0, 3)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeeklyStreak;
