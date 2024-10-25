import { useQuery } from "@apollo/client";
import { View, Text } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Calendar } from 'react-native-calendars';
import { GET_ALL_DATES_WITH_LOG_IN_A_MONTH } from "../../utils/query/badgesScreenQueries";

const CalenderStreak: React.FC = () => {

  const userId = "670db268582e7e887e447288";
  const [logDates, setLogDates] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<any[]>([])

  const { loading, error, data } = useQuery(GET_ALL_DATES_WITH_LOG_IN_A_MONTH, {
    variables: { userId: userId, year: 2024, month: 10 },
  });

  console.log(data);
  useEffect(() => {
    setLogDates(data.getTestResultsDatesByMonth);
    console.log('logdates', data.getTestResultsDatesByMonth)
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
    >
      <Calendar 
        // onDayPress={day => {
        //   setSelected(day.dateString);
        // }}
        markedDates={{
          ...markedDates
        }}
      />
    </View>
  );
};

export default CalenderStreak;
