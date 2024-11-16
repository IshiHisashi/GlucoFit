import React from "react";
import { SafeAreaView, View, FlatList } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../types/navigation";
import NotificationCard from "../molcules/NotificationCard";
import { useQuery } from "@apollo/client";
import { GET_USER_NOTIFICATIONS } from "../../utils/query/notificationQuery";

type DevAndAppScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "DevAndApp"
>;

type Notification = {
  id: string;
  title: string;
  description: string;
  type: string;
  read: boolean;
  createdAt: string;
};

const NotificationScreen: React.FC = () => {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<DevAndAppScreenNavigationProps>();

  const { loading, error, data } = useQuery(GET_USER_NOTIFICATIONS, {
    variables: { user_id: userId },
  });

  const notifications = data?.getUserNotifications || [];

  console.log(notifications);

  return (
    <SafeAreaView bg="white">
      <View height="$full">
        <HeaderWithBackButton navigation={navigation} text="Notifications" />
        <FlatList
          paddingTop={30}
          data={notifications}
          keyExtractor={(item) => (item as Notification).id}
          renderItem={({ item }) => {
            const notification = item as Notification;
            return (
              <NotificationCard
                title={notification.title}
                description={notification.description}
                type={notification.type}
                read={notification.read}
                createdAt={notification.createdAt}
              />
            );
          }}
          borderWidth={0.5}
          borderTopColor="#ccc"
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
