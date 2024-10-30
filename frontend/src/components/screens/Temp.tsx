import { Box, ScrollView, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppStackParamList } from "../../types/navigation";
import { HeaderWithBackButton } from "../headers/HeaderWithBackButton";
import NotificationRow from "../molcules/NotificationRow";

type TempNavigationProps = NativeStackNavigationProp<AppStackParamList, "Temp">;

const Temp: FC = () => {
  const navigation = useNavigation<TempNavigationProps>();

  const notificationSampleData = [
    {
      id: "1",
      title: "Daily Log Reminder",
      description: "Don't forget to log today",
      type: "log",
      createdAt: "2024-10-01T00:00:00.000Z",
      read: false,
      onPress: () => {
        navigation.navigate("GlucoseLog");
      },
    },
    {
      id: "2",
      title: "New Insights",
      description: "Your latest insights are here",
      type: "insight",
      createdAt: "2024-10-01T00:00:00.000Z",
      article_url:
        "https://www.heart.org/en/health-topics/diabetes/prevention--treatment-of-diabetes/the-diabetic-diet",
      article_title: "The Diabetic Diet",
      onPress: () => {
        navigation.navigate("Article", {
          url: "https://www.heart.org/en/health-topics/diabetes/prevention--treatment-of-diabetes/the-diabetic-diet",
          title: "The Diabetic Diet",
        });
      },
    },
    {
      id: "3",
      title: "Notification about activity?",
      description: "Notification about activity?",
      type: "activity",
      createdAt: "2024-10-01T00:00:00.000Z",
      read: true,
      onPress: function () {},
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView bg="$neutralWhite">
        <HeaderWithBackButton
          navigation={navigation}
          text="Temp"
          // rightIconOnPress={() => {}}
        />

        <Text>
          temp screen to show components for notification and settings
        </Text>

        {notificationSampleData?.length > 0 &&
          notificationSampleData.map((obj) => <NotificationRow obj={obj} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Temp;
