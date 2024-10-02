import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, View } from "@gluestack-ui/themed";

import CustomTabBar from "../navs/CustomTabBar";
import HomeScreen from "../screens/HomeScreen";
import InsightsScreen from "../screens/InsightsScreen";
import LogsScreen from "../screens/LogsScreen";
import TestStack from "./TestStack";

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Home",
        tabBarIcon: ({ focused, color, size }) => (
          <Icon
            // as={focused ? "CircleIcon" : "home"}
            size="sm"
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Insights"
      component={InsightsScreen}
      options={{
        title: "Insights",
        tabBarIcon: ({ focused, color, size }) => (
          <Icon
            // as={focused ? "CircleIcon" : "home"}
            size="sm"
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="FAB"
      component={View} // Placeholder component
      options={{
        tabBarButton: () => null, // Hide the default tab button
      }}
    />
    <Tab.Screen
      name="TestStack"
      component={TestStack}
      options={{ title: "Test" }}
    />
    <Tab.Screen
      name="Logs"
      component={LogsScreen}
      options={{ title: "Logs" }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
