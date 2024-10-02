import React, { useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  Button,
  ButtonText,
  Icon,
  Modal,
  Text,
  View,
} from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

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

export default CustomTabBar;
