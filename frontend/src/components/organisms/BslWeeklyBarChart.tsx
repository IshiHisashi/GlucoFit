import React, { FC } from "react";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";
import { View } from "@gluestack-ui/themed";

// dummy data
const data = [
  { day: "Wed", value: 180 },
  { day: "Thu", value: 140 },
  { day: "Fri", value: 100 },
  { day: "Sat", value: 120 },
  { day: "Sun", value: 160 },
  { day: "Mon", value: 150 },
  { day: "Tue", value: 130 },
];

const bslBorder = 140;

interface BslWeeklyBarChartProps {
  width: number;
}

const BslWeeklyBarChart: FC<BslWeeklyBarChartProps> = ({ width }) => {
  return (
    <View>
      {/*  style={{ borderColor: "#000000", borderWidth: 1 }} */}
      <VictoryChart
        width={width * 0.7}
        // height={200}
        domainPadding={20}
        padding={{ top: 20, bottom: 20, left: 10, right: 10 }}
      >
        {/* X-axis for days */}
        <VictoryAxis
          tickValues={["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]}
          tickFormat={(t) => t.charAt(0)}
          style={{
            axis: { stroke: "#000" },
            tickLabels: { fill: "#000", fontSize: 16, padding: 70 },
          }}
        />

        {/* Y-axis for values, will be deleted */}
        {/* <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${Math.round(t + bslBorder)}`}
          offsetX={50}
          style={{
            axis: { stroke: "#000" },
            grid: { stroke: "#e5e5e5" },
          }}
        /> */}

        {/* Bar chart */}
        <VictoryBar
          data={data}
          x="day"
          y={(d) => d.value - bslBorder}
          barWidth={20}
          barRatio={0.1}
          style={{
            data: {
              fill: ({ datum }) =>
                datum.value < bslBorder ? "#FF5733" : "#888",
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
