import React, { FC } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
} from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../types/navigation";
import NotificationCard from "../molcules/NotificationCard";
import { gql, useQuery } from "@apollo/client";

type DevAndAppScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "DevAndApp"
>;

const notifications = [
  { id: "1", title: "Welcome!", message: "Thank you for joining us." },
  { id: "2", title: "New Feature", message: "Check out our new feature now!" },
  {
    id: "3",
    title: "Reminder",
    message: "Don’t forget to complete your profile.",
  },
  // Add more notifications as needed
];

const NotificationScreen: React.FC = () => {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<DevAndAppScreenNavigationProps>();

  return (
    <SafeAreaView bg="white">
      <View height="$full">
        <HeaderWithBackButton navigation={navigation} text="Notifications" />
        <FlatList
          paddingTop={30}
          data={notifications}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => <NotificationCard />}
          borderWidth={0.5}
          borderTopColor="#ccc"
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
