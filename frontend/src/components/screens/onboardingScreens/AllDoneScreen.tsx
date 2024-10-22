import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ButtonText,
  Image,
  Center,
} from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { TabParamList } from "../../../types/navigation";

type Props = NativeStackScreenProps<TabParamList>;

const AllDoneScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <View>
      <Center p={16} flexDirection="column" gap={16} height="100%">
        <Image
          source={require("../../../../assets/OnbordingChar.png")}
          resizeMode="contain"
          mx="auto"
          width={100}
          alt="Character is winking during the onboarding process"
        />
        <Text fontWeight="bold">You're all set, done!!</Text>
        <Text textAlign="center">
          You’re ready for personalized insights and a healthier journey with
          GlucoFit.
        </Text>
        <View position="absolute" bottom={30} width="100%">
          <Button width="100%" onPress={() => navigation.navigate("Home")}>
            <ButtonText>Go to home</ButtonText>
          </Button>
        </View>
      </Center>
    </View>
  );
};

export default AllDoneScreen;
