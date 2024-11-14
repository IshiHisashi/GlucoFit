import React, { FC } from "react";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";
import { View } from "@gluestack-ui/themed";

interface BslWeeklyBarChartProps {
  width: number;
  data: {
    day: string;
    value: number;
  }[];
  bslBorder: number;
}

const BslWeeklyBarChart: FC<BslWeeklyBarChartProps> = ({
  width,
  data,
  bslBorder,
}) => {
  const convertedData = data.map((obj) => {
    if (obj.value === 0) {
      return {
        day: obj.day,
        value: bslBorder,
      };
    } else if (obj.value === bslBorder) {
      return {
        day: obj.day,
        value: obj.value + 0.1,
      };
    } else {
      return {
        day: obj.day,
        value: obj.value,
      };
    }
  });

  console.log(data[0]);

  // Calculate the max or min value in the data
  const maxDataValue = Math.max(...convertedData.map((d) => d.value));
  const minDataValue = Math.min(...convertedData.map((d) => d.value));

  // Set the minimum highest y value (e.g., 20% above bslBorder)
  const minHighestY = bslBorder * 1;

  // Use the larger or smaller
  const yAxisMax = Math.max(maxDataValue, minHighestY);
  const yAxisMin = Math.min(minDataValue, 0);

  return (
    <View>
      <VictoryChart
        width={width * 0.7}
        height={229}
        domainPadding={20}
        padding={{ top: 20, bottom: 20, left: 10, right: 10 }}
        domain={{ y: [yAxisMin - 2, yAxisMax - 2] }}
      >
        {/* X-axis for days */}
        <VictoryAxis
          tickValues={data.map((obj) => obj.day)}
          tickFormat={(t) => t[0]}
          style={{
            axis: { stroke: "#000" },
            tickLabels: { fill: "#000", fontSize: 16, padding: 10 },
          }}
        />

        {/* Bar chart */}
        <VictoryBar
          data={data}
          x="day"
          y="value"
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
