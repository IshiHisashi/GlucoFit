import { useQuery } from "@apollo/client";
import { View, Text } from "@gluestack-ui/themed";
import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { GET_ALL_DATES_WITH_LOG_IN_A_MONTH } from "../../utils/query/badgesScreenQueries";
import { AuthContext } from "../../context/AuthContext";

interface LogDates {
  getTestResultsDatesByMonth: string[];
}

const CalenderStreak: React.FC = () => {
  const [logDates, setLogDates] = useState<LogDates[]>([]);
  const [markedDates, setMarkedDates] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const { userId } = useContext(AuthContext);

  const handleMonthChange = (month: any) => {
    console.log(month);
    const year = month.year;
    const monthNumber = month.month;

    setCurrentMonth(monthNumber);
    setCurrentYear(year);

    console.log(`Raw month: ${monthNumber}, rawYear: ${year}`);
    console.log(`Current Month: ${currentMonth}, Year: ${currentYear}`);
  };

  const { loading, error, data } = useQuery(GET_ALL_DATES_WITH_LOG_IN_A_MONTH, {
    variables: { userId: userId, year: currentYear, month: currentMonth },
  });
  console.log(data);

  useEffect(() => {
    if (data?.getTestResultsDatesByMonth) {
      setLogDates(data.getTestResultsDatesByMonth);
      console.log("logdates", data.getTestResultsDatesByMonth);
    }
  }, [data]);

  useEffect(() => {
    const formattedDate = logDates.reduce(
      (acc, date) => {
        acc[date] = { selected: true, selectedColor: "orange" }; // Highlighted date with a dot
        return acc;
      },
      {} as Record<string, any>
    );
    setMarkedDates(formattedDate);
  }, [logDates]);

  return (
    <View
      flexDirection="column"
      gap={20}
      borderColor="#ccc"
      borderWidth={1}
      rounded={10}
      padding={10}
      backgroundColor="white"
    >
      <Calendar
        // onDayPress={day => {
        //   setSelected(day.dateString);
        // }}
        onMonthChange={handleMonthChange}
        markedDates={{
          ...markedDates,
        }}
      />
    </View>
  );
};

export default CalenderStreak;
