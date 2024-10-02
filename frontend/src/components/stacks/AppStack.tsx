import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import {
  Button,
  ButtonText,
  Icon,
  Modal,
  Text,
  View,
} from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

import TestScreen from "../screens/TestScreen";
import AnotherTestScreen from "../screens/AnotherTestScreen";
import HomeScreen from "../screens/HomeScreen";
import InsightsScreen from "../screens/InsightsScreen";
import LogsScreen from "../screens/LogsScreen";
import CarbsLogScreen from "../screens/logScreens/CarbsLogScreen";
import ActivityLogScreen from "../screens/logScreens/ActivityLogScreen";
import MedicineLogScreen from "../screens/logScreens/MedicineLogScreen";
import GlucoseLogScreen from "../screens/logScreens/GlucoseLogScreen";
import { RootStackParamList } from "../types";

///////////////////////////////
// remaining tasks:
// - Add the correct icons for the tab bar
// - Change how sub menu appears (slide up from bottom with animations?)
// - Change the sub menu styling and content overall
// - OnClose for sub menu
// - Solve some type issues
// - and so on~~~
///////////////////////////////

const Stack = createNativeStackNavigator<RootStackParamList>();
const LogScreensStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBar: React.FC<BottomTabBarProps> = (props) => {
  const { state, descriptors, navigation } = props;
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (route.name === "FAB") {
            return (
              <View key={route.key} style={styles.fabContainer}>
                <TouchableOpacity
                  key={route.key}
                  onPress={toggleSubMenu}
                  style={styles.fabButton}
                >
                  {/* <Icon as="AddIcon" size="md" color="#fff" /> */}
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? "#000000" : "#222",
                  size: 24,
                })}
              <Text
                style={{
                  color: isFocused ? "#000000" : "#222",
                  fontWeight: isFocused ? "bold" : "regular",
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ------ sub menu ----- */}
      <Modal isOpen={isSubMenuOpen} onClose={() => setIsSubMenuOpen(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <Button
              onPress={() => {
                setIsSubMenuOpen(false);
                navigation.navigate("CarbsLog");
              }}
            >
              <ButtonText>Food/Carbs</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setIsSubMenuOpen(false);
                navigation.navigate("MedicineLog");
              }}
            >
              <ButtonText>Medicine</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setIsSubMenuOpen(false);
                navigation.navigate("ActivityLog");
              }}
            >
              <ButtonText>Activity</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setIsSubMenuOpen(false);
                navigation.navigate("GlucoseLog");
              }}
            >
              <ButtonText>Blood Glucose</ButtonText>
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};

const TestStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Test"
      component={TestScreen}
      options={{
        title: "Test Page",
        headerStyle: {
          backgroundColor: "#2c3e50",
        },
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    />
    <Stack.Screen
      name="Another"
      component={AnotherTestScreen}
      options={{
        title: "Another Test Page",
        headerStyle: {
          backgroundColor: "#2c3e50",
        },
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CarbsLog" component={CarbsLogScreen} />
      <Stack.Screen name="ActivityLog" component={ActivityLogScreen} />
      <Stack.Screen name="MedicineLog" component={MedicineLogScreen} />
      <Stack.Screen name="GlucoseLog" component={GlucoseLogScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

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

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#f8f8dd",
    height: 90,
    paddingBottom: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ff6347",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    elevation: 8, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default AppStack;
