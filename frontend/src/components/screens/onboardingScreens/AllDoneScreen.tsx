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
          source={require("../../../../assets/allset.png")}
          resizeMode="contain"
          mx="auto"
          width={200}
          height={200}
          alt="Character is winking during the onboarding process"
        />
        <Text fontWeight="bold" fontSize={28}>
          You’re all set, Angie!
        </Text>
        <Text textAlign="center">
          You’re ready for personalized insights and a healthier journey with
          GlucoFit.
        </Text>
        <View position="absolute" bottom={30} width="100%">
          <Button
            width="100%"
            backgroundColor="#4800FF"
            borderRadius={50}
            onPress={() => navigation.navigate("Home")}
          >
            <ButtonText>Go to home</ButtonText>
          </Button>
        </View>
      </Center>
    </View>
  );
};

export default AllDoneScreen;
