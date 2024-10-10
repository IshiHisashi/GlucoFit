import React, { FC } from "react";
import {
  VictoryChart,
  VictoryArea,
  VictoryScatter,
  VictoryAxis,
} from "victory-native";
import { Center, View } from "@gluestack-ui/themed";

// dummy data
const data = [
  // { log_timestamp: new Date(2024, 9, 10, 1), bsl: 110 },
  { log_timestamp: new Date(2024, 9, 10, 5), bsl: 120 },
  { log_timestamp: new Date(2024, 9, 10, 9), bsl: 150 },
  // { log_timestamp: new Date(2024, 9, 10, 14), bsl: 130 },
  // { log_timestamp: new Date(2024, 9, 10, 18), bsl: 140 },
  { log_timestamp: new Date(2024, 9, 10, 23), bsl: 100 },
];

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

interface BslLineChartProps {
  width: number;
  data: {
    bsl: string;
    log_timestamp: Date;
  }[];
}

const BslLineChart: FC<BslLineChartProps> = ({ width, data }) => {
  const convertedData = data.map((obj) => {
    return {
      bsl: obj.bsl,
      log_timestamp: new Date(obj.log_timestamp),
    };
  });

  return (
    <Center>
      {/*  style={{ borderColor: "#000000", borderWidth: 1 }} */}
      <VictoryChart
        scale={{ x: "time" }}
        width={width * 0.9}
        padding={{ top: 20, bottom: 40, left: 50, right: 30 }}
      >
        {/* X-axis for time */}
        <VictoryAxis
          tickValues={ticks}
          tickFormat={(t) => {
            const tDate = new Date(t);
            return tDate.getHours() === 0
              ? "12am"
              : tDate.getHours() === 12
                ? "12pm"
                : tDate.getHours() > 12
                  ? `${tDate.getHours() - 12}pm`
                  : `${tDate.getHours()}am`;
          }}
        />

        {/* Y-axis */}
        <VictoryAxis dependentAxis />

        {/* Area chart */}
        <VictoryArea
          data={convertedData}
          x="log_timestamp"
          y="bsl"
          interpolation="natural"
          style={{
            data: {
              fill: "#c43a31",
              opacity: 0.5,
              stroke: "#000000",
              strokeWidth: 2,
              strokeLinecap: "round",
            },
          }}
        />

        {/* Scatter plot for data points */}
        <VictoryScatter
          data={convertedData}
          x="log_timestamp"
          y="bsl"
          size={5}
          style={{ data: { fill: "#c43a31" } }}
        />
      </VictoryChart>
    </Center>
  );
};

export default BslLineChart;
