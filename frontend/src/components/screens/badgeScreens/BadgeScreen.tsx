import React, { useState } from "react";
import {
  View,
  Text,
  Input,
  InputField,
  ScrollView,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

import StreakScreen from "./StreakScreen";
import BadgesScreen from "./BadgesScreen";
import GlucoButton from "../../atoms/GlucoButton";
import HeaderBasic from "../../headers/HeaderBasic";
import PressableOption from "../../atoms/PressableOption";
import Tab from "../../atoms/Tab";
import { FireCustom, MedalCustom } from "../../svgs/svgs";

const BadgeScreen: React.FC = () => {
  const route = useRoute<{ key: string; name: string }>();
  const [selectScreen, setSelectScreen] = useState<string>("streaks");

  const screenToBadge = () => {
    setSelectScreen("badges");
  };

  const handleSelectedScreen = (screen: string) => {
    setSelectScreen(screen);
  };

  return (
    <SafeAreaView>
      <View
        flexDirection="column"
        gap={16}
        backgroundColor="white"
        marginBottom={130}
      >
        {/* Header */}
        {/* Toggle */}
        <View flexDirection="row" flexWrap="nowrap" gap={16} margin={20}>
          <Tab
            text="Streaks"
            isFocused={selectScreen === "streaks"}
            isDisabled={false}
            onPress={() => setSelectScreen("streaks")}
            iconLeft={FireCustom}
            fontSize={14}
            flex={1}
            style={{ flexGrow: 1, flexBasis: 40 }}
          />
          <Tab
            text="Badges"
            isFocused={selectScreen === "badges"}
            isDisabled={false}
            onPress={() => setSelectScreen("badges")}
            iconLeft={MedalCustom}
            fontSize={14}
            flex={1}
            style={{ flexGrow: 1, flexBasis: 40 }}
          />
        </View>
        {/* I HAVE TO MODIFY THIS HEIGHT ISSUE HERE!!! JUST TEMPORARY MEASURE DONE */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectScreen === "streaks" && (
            <StreakScreen changeScreen={screenToBadge} />
          )}
          {selectScreen === "badges" && <BadgesScreen />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BadgeScreen;
