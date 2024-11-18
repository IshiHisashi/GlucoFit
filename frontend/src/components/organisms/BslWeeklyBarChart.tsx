import React, { FC } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLine,
} from "victory-native";
import { View } from "@gluestack-ui/themed";

interface BslWeeklyBarChartProps {
  width: number;
  data: {
    day: string;
    value: number;
  }[];
  weeklyAverage: number;
}

const BslWeeklyBarChart: FC<BslWeeklyBarChartProps> = ({
  width,
  data,
  weeklyAverage,
}) => {
  // console.log(data);
  const adjustedData = data
    .filter((obj) => obj.value !== 0)
    .map((obj) => ({
      day: obj.day,
      value: obj.value,
      y0: weeklyAverage,
    }));
  const maxDataValue = Math.max(
    ...data.map((d) => Math.abs(d.value - weeklyAverage))
  );
  const yAxisMax = weeklyAverage + maxDataValue;

  const hasLogs = data.some((obj) => obj.value !== 0);
  const domain = hasLogs
    ? { y: [weeklyAverage - maxDataValue * 1.2, yAxisMax] }
    : { y: [0, 1] };

  return (
    <View>
      <VictoryChart
        width={width * 0.6}
        height={100}
        domainPadding={{ x: 15 }}
        padding={{ top: 20, bottom: 30, left: 10, right: 10 }}
        domain={domain}
      >
        {/* X-axis for days */}
        <VictoryAxis
          tickValues={data.map((obj) => obj.day)}
          tickFormat={(t) => t[0]}
          style={{
            axis: { stroke: "none" },
            tickLabels: { fill: "#5E5E5E", fontSize: 14, padding: 10 },
          }}
        />

        {/* Horizontal line for weekly average */}
        <VictoryLine
          y={() => weeklyAverage}
          style={{
            data: { stroke: "#C2C2C2", strokeWidth: 1 },
          }}
        />

        {/* Bar chart relative to weekly average */}
        <VictoryBar
          data={adjustedData}
          x="day"
          y="value"
          y0="y0"
          barWidth={10}
          style={{
            data: {
              fill: "#8A5CFF",
            },
          }}
          cornerRadius={2}
        />
      </VictoryChart>
    </View>
  );
};

export default BslWeeklyBarChart;
