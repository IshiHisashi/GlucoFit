import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";
import { View } from "react-native";

// Data for the bar chart
const data = [
  { day: "Wed", value: 80 },
  { day: "Thu", value: 40 },
  { day: "Fri", value: 100 },
  { day: "Sat", value: 20 },
  { day: "Sun", value: 60 },
  { day: "Mon", value: 50 },
  { day: "Tue", value: 30 },
];

// Calculate the average value
const average = data.reduce((sum, d) => sum + d.value, 0) / data.length;

const BslWeeklyBarChart = () => {
  return (
    <View style={{ borderColor: "#000000", borderWidth: 1 }}>
      <VictoryChart
        domainPadding={20}
        padding={{ top: 20, bottom: 20, left: 10, right: 10 }}
      >
        {/* X-axis for days */}
        <VictoryAxis
          tickValues={["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]}
          style={{
            axis: { stroke: "#000" }, // Black axis line
            tickLabels: { fill: "#000", fontSize: 16, padding: 70 }, // Style the day labels
          }}
        />

        {/* Y-axis for values, centered on the average */}
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `${tick + average}`} // Re-align the ticks with the average
          offsetX={50}
          style={{
            axis: { stroke: "#000" },
            grid: { stroke: "#e5e5e5" }, // Add grid lines
          }}
        />

        {/* Bar chart */}
        <VictoryBar
          data={data}
          x="day"
          y={(d) => d.value - average} // Offset by the average to shift the X-axis
          barWidth={20}
          barRatio={0.1}
          style={{
            data: {
              fill: ({ datum }) => (datum.value < average ? "#FF5733" : "#888"), // Different color for bars below the average
              opacity: 0.7,
            },
          }}
          cornerRadius={10}
        />
      </VictoryChart>
    </View>
  );
};

export default BslWeeklyBarChart;
