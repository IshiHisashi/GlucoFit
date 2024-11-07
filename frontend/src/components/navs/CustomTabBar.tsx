import React, { FC, useRef, useState } from "react";
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
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { PlusCustom, TimesCustom } from "../svgs/svgs";

interface SubMenuItemProps {
  onPress: () => void;
  text: string;
}

const SubMenuItem: FC<SubMenuItemProps> = (props) => {
  const { onPress, text } = props;

  return (
    <Pressable
      onPress={onPress}
      p="$4"
      w="$full"
      $active-color="$primaryIndigo60"
      $_active={{ color: "#4800FF" }}
    >
      <Text
        textAlign="center"
        $active-color="$primaryIndigo60"
        $_active={{ color: "#4800FF" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const CustomTabBar: React.FC<BottomTabBarProps> = (props) => {
  const { state, descriptors, navigation } = props;
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
    Animated.timing(rotateAnim, {
      toValue: isSubMenuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabBar} zIndex={1}>
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
              <View key={route.key} style={styles.fabContainer} zIndex={100}>
                {/* <TouchableOpacity
                  key={route.key}
                  onPress={toggleSubMenu}
                  style={styles.fabButton}
                > */}
                {/* {options.tabBarIcon &&
                    options.tabBarIcon({
                      focused: isFocused,
                      color: "",
                      size: 0,
                    })} */}
                {/* <Animated.View
                    style={{ transform: [{ rotate: spin }] }}
                    zIndex={100}
                  >
                    <PlusCustom color="#ffffff" size={32} />
                  </Animated.View>
                </TouchableOpacity> */}
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

        {/* ------ FAB Button ------ */}
        <View
          style={styles.fabContainer}
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          zIndex={100}
        >
          <TouchableOpacity onPress={toggleSubMenu} style={styles.fabButton}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <PlusCustom color="#ffffff" size={32} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>

      {/* ------ sub menu ----- */}
      <Modal
        isOpen={isSubMenuOpen}
        onClose={toggleSubMenu}
        justifyContent="flex-end"
      >
        <ModalBackdrop bg="$neutralWhite" />
        <ModalContent w="$full">
          <ModalBody pb={90}>
            <SubMenuItem
              onPress={() => {
                // setIsSubMenuOpen(false);
                toggleSubMenu();
                navigation.navigate("CarbsLog");
              }}
              text="Food/Carbs"
            />
            <SubMenuItem
              onPress={() => {
                // setIsSubMenuOpen(false);
                toggleSubMenu();
                navigation.navigate("MedicineLog");
              }}
              text="Medicine"
            />
            <SubMenuItem
              onPress={() => {
                // setIsSubMenuOpen(false);
                toggleSubMenu();
                navigation.navigate("ActivityLog");
              }}
              text="Activity"
            />
            {/* <SubMenuItem
              onPress={() => {
                // setIsSubMenuOpen(false);
                toggleSubMenu();
                navigation.navigate("GlucoseLog",{
                  BGL: "0",
                  fromAuto: false
                });
              }}
              text="Blood Glucose"
            /> */}
            <SubMenuItem
              onPress={() => {
                // setIsSubMenuOpen(false);
                toggleSubMenu();
                navigation.navigate("AutoLog");
              }}
              text="Blood Glucose"
            />
          </ModalBody>
          <View style={styles.fabContainer}>
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
    // box-shadow: 0px -3px 13.3px 0px rgba(34, 4, 118, 0.04);
    shadowColor: "#220476",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 13.3,
    elevation: 5, // for Android shadow
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
    bottom: 25,
    elevation: 8, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CustomTabBar;
