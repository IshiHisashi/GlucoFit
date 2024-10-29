import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, View } from "@gluestack-ui/themed";

import CustomTabBar from "../navs/CustomTabBar";
import HomeScreen from "../screens/HomeScreen";
import InsightsScreen from "../screens/InsightsScreen";
import LogsScreen from "../screens/LogsScreen";
import TestStack from "./TestStack";
import BadgeScreen from "../screens/badgeScreens/BadgeScreen";
import LoginSignupStack from "./LoginSignupStack";
import {
  AnalysisCustom,
  AwardCustom,
  FileCustom,
  HomeCustom,
  PlusCustom,
} from "../svgs/svgs";
const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Home",
        tabBarIcon: ({ focused, color, size }) => (
          <HomeCustom color={focused ? "#3D00D6" : "#141414"} size={28} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Insights"
      component={InsightsScreen}
      options={{
        title: "Insights",
        tabBarIcon: ({ focused, color, size }) => (
          <AnalysisCustom color={focused ? "#3D00D6" : "#141414"} size={28} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="FAB"
      component={View} // Placeholder component
      options={{
        tabBarButton: () => null, // Hide the default tab button
        tabBarIcon: ({ focused, color, size }) => (
          <PlusCustom color="#ffffff" size={32} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Logs"
      component={LogsScreen}
      options={{
        title: "Logs",
        tabBarIcon: ({ focused, color, size }) => (
          <FileCustom color={focused ? "#3D00D6" : "#141414"} size={28} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="BadgeScreen"
      component={BadgeScreen}
      options={{
        title: "Badges",
        tabBarIcon: ({ focused, color, size }) => (
          <AwardCustom color={focused ? "#3D00D6" : "#141414"} size={28} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="LoginSignupScreen"
      component={LoginSignupStack}
      options={{ title: "Welcome", headerShown: false }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
