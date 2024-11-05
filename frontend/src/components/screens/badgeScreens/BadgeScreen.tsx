import React, { useState } from "react";
import { View, Text, Input, InputField, ScrollView } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

import StreakScreen from "./StreakScreen";
import BadgesScreen from "./BadgesScreen";
import GlucoButton from "../../atoms/GlucoButton";
import HeaderBasic from "../../headers/HeaderBasic";

const BadgeScreen: React.FC = () => {
  const route = useRoute<{ key: string; name: string }>();
  const [selectScreen, setSelectScreen] = useState<string>("streaks");

  const screenToBadge = () => {
    setSelectScreen("badges");
  }

  return (
    <SafeAreaView>
      <View flexDirection="column" gap={16} backgroundColor="white" marginBottom={130}>
        {/* Header */}
        {/* Toggle */}
        <View flexDirection="row" width="$full" gap={10} padding={16} paddingBottom={0}>
          <GlucoButton
            buttonType="primary"
            text="Streaks"
            isDisabled={false}
            flex={1}
            onPress={() => setSelectScreen("streaks")}
          />
          <GlucoButton
            buttonType="primary"
            text="Badges"
            isDisabled={false}
            flex={1}
            onPress={() => setSelectScreen("badges")}
          />
        </View>
        {/* I HAVE TO MODIFY THIS HEIGHT ISSUE HERE!!! JUST TEMPORARY MEASURE DONE */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectScreen === "streaks" && <StreakScreen changeScreen={screenToBadge}/>}
          {selectScreen === "badges" && <BadgesScreen />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BadgeScreen;
