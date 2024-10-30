import { Box, ScrollView, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppStackParamList } from "../../types/navigation";
import { HeaderWithBackButton } from "../headers/HeaderWithBackButton";
import NotificationRow from "../molcules/NotificationRow";
import { EditCustom } from "../svgs/svgs";
import SettingsCard from "../molcules/SettingsCard";
import ToggleCard from "../molcules/ToggleCard";
import ProfileCard from "../molcules/ProfileCard";

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

  const settingsCardSampleData = [
    {
      onPress: () => console.log("pressed"),
      icon: EditCustom,
      text: "Placeholder",
      description: "Description",
      isDisabled: false,
      isFocused: false,
    },
  ];

  const toggleCardSampleData = [
    {
      text: "Placeholder",
      description: "Description",
      onToggle: (value: boolean) => console.log("Toggle:", value),
      isEnabled: false,
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

        <Text>notification rows</Text>
        {notificationSampleData?.length > 0 &&
          notificationSampleData.map((obj) => <NotificationRow obj={obj} />)}

        <Text>setting cards</Text>
        {settingsCardSampleData?.length > 0 &&
          settingsCardSampleData.map((obj, index) => (
            <SettingsCard obj={{ ...obj, key: index }} />
          ))}

        <Text>toggle cards</Text>
        {toggleCardSampleData?.length > 0 &&
          toggleCardSampleData.map((obj, index) => (
            <ToggleCard obj={{ ...obj, key: index }} />
          ))}

        <Text>profile card</Text>
        <ProfileCard
          name="user's name"
          profileImageUrl=""
          onPressProfileCard={() => console.log("go to profile edit page")}
          onPressProfilePic={() => console.log("open image picker")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Temp;
