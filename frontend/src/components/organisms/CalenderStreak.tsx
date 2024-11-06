import { useQuery } from "@apollo/client";
import { View, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Calendar } from 'react-native-calendars';
import { GET_ALL_DATES_WITH_LOG_IN_A_MONTH } from "../../utils/query/badgesScreenQueries";

interface LogDates {
  getTestResultsDatesByMonth: String[]
}

const CalenderStreak: React.FC = () => {

  const userId = "670db268582e7e887e447288";
  const [logDates, setLogDates] = useState<LogDates[]>([]);
  const [markedDates, setMarkedDates] = useState<any[]>([])
  const [currentMonth, setCurrentMonth] = useState<Number>(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<Number>(new Date().getFullYear());

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
      console.log('logdates', data.getTestResultsDatesByMonth)      
    }
  }, [data])

  useEffect(() => {
    const formattedDate = logDates.reduce((acc, date) => {
      acc[date] = { selected: true, selectedColor: 'orange'  }; // Highlighted date with a dot
      return acc;
    }, {} as Record<string, any>);
    setMarkedDates(formattedDate);
  }, [logDates])


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
          ...markedDates
        }}
      />
    </View>
  );
};

export default CalenderStreak;
