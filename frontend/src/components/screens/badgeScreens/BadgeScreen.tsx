import React, { useState } from "react";
import { View, Text, Input, InputField } from "@gluestack-ui/themed";
import StreakScreen from "./StreakScreen";
import BadgesScreen from "./BadgesScreen";
import GlucoButton from "../../atoms/GlucoButton";

const BadgeScreen: React.FC = () => {
  const [selectScreen, setSelectScreen] = useState<string>("streaks");
  return (
    <View padding={16} flexDirection="column" gap={16}>
      {/* Header */}
      <View flexDirection="row" gap={10} alignItems="center">
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          flex={1}
        >
          <InputField placeholder="Enter Text here" />
        </Input>
        <Text>A</Text>
        <Text>Notif</Text>
      </View>
      {/* Toggle */}
      <View flexDirection="row" width="$full" gap={10}>
        <GlucoButton
          text="Streaks"
          isDisabled={false}
          flex={1}
          onPress={() => setSelectScreen("streaks")}
        />
        <GlucoButton
          text="Badges"
          isDisabled={false}
          flex={1}
          onPress={() => setSelectScreen("badges")}
        />
      </View>
      {selectScreen === "streaks" && <StreakScreen />}
      {selectScreen === "badges" && <BadgesScreen />}
    </View>
  );
};

export default BadgeScreen;
