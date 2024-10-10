import {
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Icon,
  MoonIcon,
  Pressable,
  Text,
  VStack,
  ChevronRightIcon,
  ScrollView,
} from "@gluestack-ui/themed";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { gql, useQuery } from "@apollo/client";

import BslLineChart from "../organisms/BslLineChart";
import BslWeeklyBarChart from "../organisms/BslWeeklyBarChart";

// hardcode for now
const userId = "60d8f33e7f3f83479cbf5b4f";

const GET_TOTAL_STEPS_FOR_TODAY = gql`
  query GetTotalStepsForToday($userId: ID!) {
    getTotalStepsForToday(user_id: $userId)
  }
`;

interface HomeScreenProps {
  navigation: NavigationProp<{}>;
}

const TotalSteps = () => {
  const { loading, error, data } = useQuery(GET_TOTAL_STEPS_FOR_TODAY, {
    variables: { userId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>N/A Steps</Text>;

  return <Text>{data.getTotalStepsForToday} Steps</Text>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();

  return (
    <ScrollView>
      <VStack p="$4" space="md">
        <VStack
          space="sm"
          borderWidth={1}
          borderColor="$borderLight200"
          borderRadius="$md"
          p="$4"
        >
          <HStack alignItems="center" justifyContent="space-between">
            <VStack>
              <HStack alignItems="center" space="xs">
                <Text fontSize="$4xl" fontWeight="$bold">
                  150
                </Text>
                <Text>mg/dL</Text>
              </HStack>
              <Text>6:00pm</Text>
            </VStack>
            <TotalSteps />
          </HStack>

          <BslLineChart width={width} />
        </VStack>

        <VStack
          borderWidth={1}
          borderColor="$borderLight200"
          borderRadius="$md"
          p="$4"
        >
          <Text>Do you want to connect your device?</Text>
          <Text>Supporting text here</Text>
          <Button>
            <ButtonText>Connect device</ButtonText>
          </Button>
        </VStack>

        {/* will be replaced by log table component ---------------------------------- */}
        <VStack
          borderWidth={1}
          borderColor="$borderLight200"
          borderRadius="$md"
          p="$2"
        >
          <HStack alignItems="center" justifyContent="space-between" p="$2">
            <Text fontSize="$lg" fontWeight="$bold">
              Logs for today
            </Text>
            <Pressable onPress={() => navigation.navigate("Logs")}>
              <HStack alignItems="center" space="xs">
                <Text>See more</Text>
                <Icon as={ChevronRightIcon} size="sm" mr="$2" />
              </HStack>
            </Pressable>
          </HStack>

          <Pressable onPress={() => {}}>
            <HStack justifyContent="space-between" p="$2">
              <HStack alignItems="center" space="xs">
                <Box style={styles.iconContainer}>
                  <Icon as={MoonIcon} marginRight="$2" />
                </Box>
                <VStack space="xs">
                  <Text fontWeight="$bold">Blood Glucose</Text>
                  <Text>6:00 PM</Text>
                </VStack>
              </HStack>
              <HStack alignItems="center" space="xs">
                <Text size="3xl" fontWeight="$bold">
                  150
                </Text>
                <Text>mg/dL</Text>
              </HStack>
            </HStack>
          </Pressable>
        </VStack>
        {/* ---------------------------------------------------------------------- */}

        <VStack
          borderWidth={1}
          borderColor="$borderLight200"
          borderRadius="$md"
          p="$2"
        >
          <HStack alignItems="center" justifyContent="space-between" p="$2">
            <Text>Sep 24 - 0ct 30, 2024</Text>
            <Pressable onPress={() => navigation.navigate("Logs")}>
              <HStack alignItems="center" space="xs">
                <Text>See more</Text>
                <Icon as={ChevronRightIcon} size="sm" mr="$2" />
              </HStack>
            </Pressable>
          </HStack>

          <HStack alignItems="center" justifyContent="space-between" space="sm">
            <Center>
              <Text size="3xl" fontWeight="$bold">
                150
              </Text>
              <Text>mg/dL</Text>
              <Text>Average</Text>
            </Center>
            <BslWeeklyBarChart width={width} />
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginRight: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
