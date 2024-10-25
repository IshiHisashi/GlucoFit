import { View, Text } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { Calendar } from 'react-native-calendars';

const CalenderStreak: React.FC = () => {
  const [selected, setSelected] = useState('');

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
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
      />
    </View>
  );
};

export default CalenderStreak;
