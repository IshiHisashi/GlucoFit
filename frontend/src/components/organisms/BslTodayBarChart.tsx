import { Center } from "@gluestack-ui/themed";
import React, { FC } from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
} from "victory-native";

interface BslTodayBarChartProps {
  width: number;
  data: {
    bsl: string;
    log_timestamp: Date;
  }[];
  bslMax: number;
  bslMin: number;
}

const BslTodayBarChart: FC<BslTodayBarChartProps> = ({
  width,
  data,
  bslMax,
  bslMin,
}) => {
  // tick values for the X-axis
  const ticks = [
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      0
    ),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      6
    ),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      12
    ),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      18
    ),
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1,
      0
    ),
  ];

  const convertedData = data.map((obj) => {
    return {
      bsl: parseFloat(obj.bsl),
      log_timestamp: new Date(obj.log_timestamp),
    };
  });

  return (
    <Center>
      <VictoryChart
        width={width * 0.9}
        padding={{ top: 40, bottom: 40, left: 50, right: 30 }}
        domain={{ x: [ticks[0], ticks[ticks.length - 1]] }}
      >
        {/* X-axis for time */}
        <VictoryAxis
          tickValues={ticks}
          tickFormat={(t, index) => {
            if (index === 4) return "";
            const tDate = new Date(t);
            return tDate.getHours() === 0
              ? "12am"
              : tDate.getHours() === 12
                ? "12pm"
                : tDate.getHours() > 12
                  ? `${tDate.getHours() - 12}pm`
                  : `${tDate.getHours()}am`;
          }}
          offsetX={10}
          style={{
            axis: { stroke: "#ADADAD", strokeWidth: 1 }, // X-axis color
            ticks: { stroke: "#ADADAD", size: 5 }, // Small vertical tick marks
            // tickLabels: { fontSize: 12, padding: 5 }, // Label style
            tickLabels: { fontSize: 14, padding: 5 },
          }}
        />

        {/* Y-axis */}
        <VictoryAxis
          dependentAxis
          domain={[0, bslMax]}
          tickValues={[bslMin, bslMax]}
          style={{
            axis: { stroke: "none" },
            ticks: { stroke: "none" },
          }}
        />

        {/* Horizontal line for bslMax */}
        <VictoryLine
          y={() => bslMax}
          style={{
            data: { stroke: "#E0E0E0", strokeWidth: 2 },
          }}
        />

        {/* Horizontal line for bslMin */}
        <VictoryLine
          y={() => bslMin}
          style={{
            data: { stroke: "#E0E0E0", strokeWidth: 2 },
          }}
        />

        {/* Bar chart */}
        <VictoryBar
          data={convertedData}
          x="log_timestamp"
          y="bsl"
          barWidth={15}
          barRatio={0.1}
          cornerRadius={5}
          style={{
            data: {
              fill: "#FF6B4D",
            },
          }}
        />
      </VictoryChart>
    </Center>
  );
};

export default BslTodayBarChart;
