import { Center } from "@gluestack-ui/themed";
import React, { FC } from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";

interface BslTodayBarChartProps {
  width: number;
  data: {
    bsl: string;
    log_timestamp: Date;
  }[];
}

const BslTodayBarChart: FC<BslTodayBarChartProps> = ({ width, data }) => {
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
      bsl: obj.bsl,
      log_timestamp: new Date(obj.log_timestamp),
    };
  });

  return (
    <Center>
      <VictoryChart
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
