import React from "react";
import {
  VictoryChart,
  VictoryArea,
  VictoryScatter,
  VictoryAxis,
} from "victory-native";
import { View } from "react-native";

const data = [
  { time: new Date(2024, 9, 9, 1), value: 110 },
  { time: new Date(2024, 9, 9, 5), value: 120 },
  { time: new Date(2024, 9, 9, 9), value: 150 },
  { time: new Date(2024, 9, 9, 14), value: 130 },
  { time: new Date(2024, 9, 9, 18), value: 140 },
  // { time: new Date(2024, 9, 9, 23), value: 100 },
];

// Define the tick values for the X-axis
const ticks = [
  new Date(2024, 9, 9, 0), // 12am
  new Date(2024, 9, 9, 6), // 6am
  new Date(2024, 9, 9, 12), // 12pm
  new Date(2024, 9, 9, 18), // 6pm
  new Date(2024, 9, 10, 0), // 12am (next day)
];

const BslLineChart = () => {
  return (
    <View>
      <VictoryChart scale={{ x: "time" }}>
        {/* Custom X-axis tick values and formatting */}
        <VictoryAxis
          tickValues={ticks}
          tickFormat={(t) =>
            `${t.getHours() === 0 ? "12am" : t.getHours() === 12 ? "12pm" : t.getHours() + "am"}`
          }
        />
        <VictoryAxis dependentAxis />
        {/* Area chart instead of line chart */}
        <VictoryArea
          data={data}
          x="time"
          y="value"
          interpolation="natural" // Makes the area smooth
          style={{
            data: {
              fill: "#c43a31",
              opacity: 0.5,
              stroke: "#000000",
              strokeWidth: 2,
              strokeLinecap: "round",
            },
          }} // Set opacity for the area
        />
        {/* Scatter plot for data points */}
        <VictoryScatter
          data={data}
          x="time"
          y="value"
          size={5}
          style={{ data: { fill: "#c43a31" } }}
        />
      </VictoryChart>
    </View>
  );
};

export default BslLineChart;
