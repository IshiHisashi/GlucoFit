import React, { FC, useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  Button,
  ButtonText,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  Pressable,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TimesCustom } from "../svgs/svgs";

interface SubMenuButtonProps {
  onPress: () => void;
  text: string;
}

const SubMenuButton: FC<SubMenuButtonProps> = (props) => {
  const { onPress, text } = props;

  return (
    <Pressable onPress={onPress} $active-bg="$neutralDark10" p="$4" w="$full">
      <Text textAlign="center">{text}</Text>
    </Pressable>
  );
};

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
                  {options.tabBarIcon &&
                    options.tabBarIcon({
                      focused: isFocused,
                      color: "",
                      size: 0,
                    })}
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
                  color: "",
                  size: 0,
                })}
              <Text
                fontFamily={isFocused ? "$bold" : "$regular"}
                color={isFocused ? "$primaryIndigo70" : "$neutralDark90"}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ------ sub menu ----- */}
      <Modal
        isOpen={isSubMenuOpen}
        onClose={() => setIsSubMenuOpen(false)}
        justifyContent="flex-end"
      >
        <ModalBackdrop bg="$neutralWhite" />
        <ModalContent w="$full">
          <ModalBody pb={90}>
            <SubMenuButton
              onPress={() => {
                setIsSubMenuOpen(false);
                navigation.navigate("CarbsLog");
              }}
              text="Food/Carbs"
            />
            <SubMenuButton
              onPress={() => {
                setIsSubMenuOpen(false);
                navigation.navigate("MedicineLog");
              }}
              text="Medicine"
            />
            <SubMenuButton
              onPress={() => {
                setIsSubMenuOpen(false);
                navigation.navigate("ActivityLog");
              }}
              text="Activity"
            />
            <SubMenuButton
              onPress={() => {
                setIsSubMenuOpen(false);
                navigation.navigate("GlucoseLog");
              }}
              text="Blood Glucose"
            />
          </ModalBody>
          <View style={styles.fabContainer} bottom={5}>
            <TouchableOpacity onPress={toggleSubMenu} style={styles.fabButton}>
              <TimesCustom color="#ffffff" size={32} />
            </TouchableOpacity>
          </View>
        </ModalContent>
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
    backgroundColor: "#ffffff",
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
    backgroundColor: "#4800FF",
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
