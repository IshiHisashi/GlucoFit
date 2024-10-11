import {
  Center,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  Button,
  ButtonText,
  CalendarDaysIcon,
  RefreshControl,
  Heading,
} from "@gluestack-ui/themed";
import React, { useCallback, useState } from "react";
import GlucoButton from "../atoms/GlucoButton";

const InsightsScreen: React.FC = (props) => {
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
      <GlucoButton text="full width btn" isDisabled={false} />
      <GlucoButton
        text="full width btn"
        isDisabled={false}
        icon={CalendarDaysIcon}
      />

      {/* two buttons taking up the screen width */}
      <Heading>two buttons taking up the screen width</Heading>
      <HStack space="sm">
        <GlucoButton text="one" isDisabled={false} flex={1} />
        <GlucoButton
          text="two"
          isDisabled={false}
          icon={CalendarDaysIcon}
          flex={1}
        />
      </HStack>

      {/* horizontal scroll buttons */}
      <Heading>horizontal scroll buttons</Heading>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="sm">
          <GlucoButton text="btn a" isDisabled={false} />
          <GlucoButton text="btn aa" isDisabled={false} />
          <GlucoButton
            text="btn aaa"
            isDisabled={false}
            icon={CalendarDaysIcon}
          />
          <GlucoButton
            text="btn aaaa"
            isDisabled={false}
            icon={CalendarDaysIcon}
          />
          <GlucoButton
            text="btn aaaaa"
            isDisabled={false}
            icon={CalendarDaysIcon}
          />
        </HStack>
      </ScrollView>
    </ScrollView>
  );
};

export default InsightsScreen;
