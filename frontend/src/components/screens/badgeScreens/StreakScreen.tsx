import { View, Text, ScrollView, Center } from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import WeeklyStreak from "../../organisms/WeeklyStreak";
import CalenderStreak from "../../organisms/CalenderStreak";
import ProgressBudge from "../../organisms/ProgressBudge";
import { Image } from "@gluestack-ui/themed";
import { Animated, StyleSheet } from "react-native";

interface StreakScreenProps {
  changeScreen: () => void;
}

const StreakScreen: React.FC<StreakScreenProps> = ({ changeScreen }) => {
  const [streakNum, setStreakNum] = useState<number>(7);
  const [streakBad, setstreakBad] = useState<boolean>(false);
  const [streakMid, setStreakMid] = useState<boolean>(false);
  const [streakGood, setStreakGood] = useState<boolean>(false);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (streakNum >= 6) {
      setStreakGood(true);
      setStreakMid(false);
      setstreakBad(false);
    } else if (streakNum >= 4) {
      setStreakGood(false);
      setStreakMid(true);
      setstreakBad(false);
    } else {
      setStreakGood(false);
      setStreakMid(false);
      setstreakBad(true);
    }
  }, [streakNum]);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2, // Scale up
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1, // Scale down
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
  }, [scale]);

  return (
    <View flexDirection="column" gap={20}>
      <Center padding={16}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.pulseCircle,
              { transform: [{ scale }] },
              streakGood
                ? { backgroundColor: "#FAF8FF" }
                : streakMid
                  ? { backgroundColor: "#FFFAEA" }
                  : { backgroundColor: "#FFEDE9" },
            ]}
          />
          <Image
            source={
              streakGood
                ? require("../../../../assets/glucoFaces/glucoSmile.png")
                : streakMid
                  ? require("../../../../assets/glucoFaces/glucoNeutral.png")
                  : require("../../../../assets/glucoFaces/glucoFrowned.png")
            }
            alt="icon-face"
            style={styles.image}
          />
        </View>
        <Text fontSize={28} fontFamily="$bold" color="black">
          Sugar Baby
        </Text>
      </Center>

      <View
        flexDirection="column"
        gap={20}
        padding={16}
        backgroundColor="#FAF6FF"
      >
        <WeeklyStreak setStreakNum={setStreakNum} />
        <CalenderStreak />
        <ProgressBudge goToBadges={changeScreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  pulseCircle: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
  },
  image: {
    width: 185,
    height: 185,
    borderRadius: 50,
  },
});

export default StreakScreen;
