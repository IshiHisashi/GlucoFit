import { View, Text } from "@gluestack-ui/themed";
import React from "react";

const ProgressBudge: React.FC = () => {
  return (
    <View
      flexDirection="column"
      gap={20}
      borderColor="#ccc"
      borderWidth={1}
      rounded={10}
      padding={10}
    >
      <Text fontSize={20} fontWeight="$semibold">
        Progress
      </Text>
    </View>
  );
};

export default ProgressBudge;
