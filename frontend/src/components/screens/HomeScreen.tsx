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
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { NavigationProp } from "@react-navigation/native";

interface HomeScreenProps {
  navigation: NavigationProp<{}>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // dummy data
  const data = [
    {
      id: "1",
      avatarUrl: "https://randomuser",
      logCategory: "Blood Glucose",
      time: "10:00 AM",
      result: "120 mg/dL",
    },
    {
      id: "2",
      avatarUrl: "https://randomuser",
      logCategory: "Activity",
      time: "10:00 AM",
      result: "30 min",
    },
  ];

  return (
    <VStack>
      <Box>
        <Heading>Today</Heading>
        <Text>Here's a section to show the chart.</Text>
      </Box>

      <Box>
        <Text>Banner to connect your device</Text>
      </Box>

      <Box>
        <HStack>
          <Heading>Detailed logs for today here</Heading>
          <Button onPress={() => navigation.navigate("Logs")}>
            <ButtonText>See other logs</ButtonText>
          </Button>
        </HStack>

        {/* copy-and-pasted from gluestack docs https://v1.gluestack.io/ui/docs/components/react-native-components/flat-list */}
        <Box py="$10">
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Box
              // borderBottomWidth="$1"
              // borderColor="$trueGray800"
              // $dark-borderColor="$trueGray100"
              // $base-pl={0}
              // $base-pr={0}
              // $sm-pl="$4"
              // $sm-pr="$5"
              // py="$2"
              >
                <Pressable onPress={() => navigation.navigate("Logs")}>
                  <HStack space="md" justifyContent="space-between">
                    <HStack>
                      <Avatar size="md">
                        <AvatarImage source={{ uri: item.avatarUrl }} />
                      </Avatar>
                      <VStack>
                        <Text
                          color="$coolGray800"
                          fontWeight="$bold"
                          $dark-color="$warmGray100"
                        >
                          {item.logCategory}
                        </Text>
                        <Text color="$coolGray600" $dark-color="$warmGray200">
                          {item.time}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text
                      fontSize="$xs"
                      color="$coolGray800"
                      alignSelf="flex-start"
                      $dark-color="$warmGray100"
                    >
                      {item.result}
                    </Text>
                  </HStack>
                </Pressable>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </Box>
    </VStack>
  );
};

export default HomeScreen;
