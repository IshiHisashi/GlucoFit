import {
  Center,
  HStack,
  ScrollView,
  Text,
  RefreshControl,
  Heading,
} from "@gluestack-ui/themed";
import React, { useCallback, useState } from "react";
import GlucoButton from "../atoms/GlucoButton";
import {
  BookmarkCustom,
  BookmarkLight,
  CapsuleCustom,
  CapsuleLight,
  FireCustom,
  FireLight,
  HeartbeatCustom,
  HeartbeatLight,
  MedalDark,
  RestaurantCustom,
  RestaurantLight,
} from "../svgs/svgs";

const InsightsScreen: React.FC = () => {
  // test pull down refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // fetching data would be here instead of setTimeout
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Center>
        <Text>
          This is insights screen... currently showing sammple usages of
          buttons.
        </Text>
      </Center>

      {/* full width button */}
      <Heading>full width buttons</Heading>
      <GlucoButton
        buttonType="primary"
        text="full width btn"
        isDisabled={false}
        onPress={() => console.log("pressed")}
        style={{ borderColor: "red", borderWidth: 1 }}
      />
      <GlucoButton
        buttonType="secondary"
        text="full width btn"
        isDisabled={false}
        icon={BookmarkCustom}
        onPress={() => console.log("pressed")}
      />

      {/* two buttons taking up the screen width */}
      <Heading>two buttons taking up the screen width</Heading>
      <HStack space="sm">
        <GlucoButton
          buttonType="primary"
          text="one"
          isDisabled={false}
          flex={1}
          onPress={() => console.log("pressed")}
        />
        <GlucoButton
          buttonType="secondary"
          text="two"
          isDisabled={false}
          icon={CapsuleCustom}
          flex={1}
          onPress={() => console.log("pressed")}
        />
      </HStack>

      {/* horizontal scroll buttons */}
      <Heading>horizontal scroll buttons</Heading>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="sm">
          <GlucoButton
            buttonType="primary"
            text="btn a"
            isDisabled={false}
            onPress={() => console.log("pressed")}
          />
          <GlucoButton
            buttonType="primary"
            text="btn aa"
            isDisabled={false}
            onPress={() => console.log("pressed")}
          />
          <GlucoButton
            buttonType="primary"
            text="btn aaa"
            isDisabled={false}
            icon={HeartbeatCustom}
            onPress={() => console.log("pressed")}
          />
          <GlucoButton
            buttonType="primary"
            text="btn aaaa"
            isDisabled={false}
            icon={RestaurantCustom}
            onPress={() => console.log("pressed")}
          />
          <GlucoButton
            buttonType="primary"
            text="btn aaaaa"
            isDisabled={false}
            icon={FireCustom}
            onPress={() => console.log("pressed")}
          />
        </HStack>
      </ScrollView>
    </ScrollView>
  );
};

export default InsightsScreen;
