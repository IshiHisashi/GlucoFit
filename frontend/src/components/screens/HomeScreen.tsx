import {
  Avatar,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  Center,
  FlatList,
  Heading,
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
import { StyleSheet } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";

interface HomeScreenProps {
  navigation: NavigationProp<{}>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // dummy data
  const lineData = [
    { value: 120, dataPointText: "120" },
    { value: 140, dataPointText: "140" },
    { value: 145, dataPointText: "145" },
    { value: 158, dataPointText: "158" },
    { value: null, dataPointText: null },
  ];

  const barData = [
    { value: 150, label: "W" },
    { value: 140, label: "T" },
    { value: 160, label: "F" },
    { value: 130, label: "S" },
    { value: 140, label: "S" },
    { value: 150, label: "M" },
    { value: 120, label: "T" },
  ];

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
            <Text>500 Steps</Text>
          </HStack>

          <Box>
            <LineChart
              data={lineData}
              // width={width - 40}
              width={300}
              height={200}
              spacing={50}
              color="#000000"
              thickness={2}
              startFillColor="rgba(0,0,0,0.1)"
              endFillColor="rgba(0,0,0,0.01)"
              initialSpacing={0}
              noOfSections={3}
              maxValue={200}
              // yAxisLabel="mg/dL"
              yAxisLabelWidth={40}
              xAxisLabelTexts={["12am", "6am", "12pm", "6pm", "12am"]}
              hideRules
              hideYAxisText
              focusedDataPointColor="#000000"
              focusedDataPointRadius={6}
              dataPointsHeight={20}
              dataPointsWidth={20}
              curved
            />
          </Box>
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

        <VStack
          borderWidth={1}
          borderColor="$borderLight200"
          borderRadius="$md"
          p="$4"
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

          <BarChart
            data={barData}
            // width={width - 40}
            height={150}
            barWidth={30}
            spacing={20}
            barBorderRadius={4}
            frontColor="rgba(0,0,0,0.3)"
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#E0E0E0",
    marginRight: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
