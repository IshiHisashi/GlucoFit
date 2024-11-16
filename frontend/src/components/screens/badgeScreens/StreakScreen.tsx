import { View, Text, ScrollView, Center } from "@gluestack-ui/themed";
import React from "react";
import WeeklyStreak from "../../organisms/WeeklyStreak";
import CalenderStreak from "../../organisms/CalenderStreak";
import ProgressBudge from "../../organisms/ProgressBudge";
import { Image } from "@gluestack-ui/themed";

interface StreakScreenProps {
  changeScreen: () => void;
}

const StreakScreen: React.FC<StreakScreenProps> = ({ changeScreen }) => {
  const goToBadges = () => {
    changeScreen();
  };

  return (
    <View flexDirection="column" gap={20}>
      <Center paddingBottom={40} padding={16}>
        <Image
          source={require("../../../../assets/allset.png")}
          alt="icon-face"
          width={200}
          height={200}
          marginBottom={20}
        />
        <Text fontSize={28} color="black">
          Sugar Baby
        </Text>
      </Center>

      <View
        flexDirection="column"
        gap={20}
        padding={16}
        backgroundColor="#FAF6FF"
      >
        <WeeklyStreak />
        <CalenderStreak />
        <ProgressBudge goToBadges={goToBadges} />
      </View>
    </View>
  );
};

export default StreakScreen;
