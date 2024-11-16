import React from "react";
import {
  Box,
  Center,
  Text,
  ExternalLinkIcon,
  Icon,
} from "@gluestack-ui/themed";
import { useLayoutEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

// Define the props for AnotherTest, including navigation
type AnotherTestProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Another">;
};

const AnotherTest: React.FC<AnotherTestProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Icon as={ExternalLinkIcon} />,
    });
    return () => {};
  }, [navigation]);

  return (
    <Box>
      <Center>
        <Text>Just another test page. Nothing to do here.</Text>
      </Center>
    </Box>
  );
};

export default AnotherTest;
