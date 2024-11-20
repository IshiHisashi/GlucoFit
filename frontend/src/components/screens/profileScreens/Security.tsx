import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  ButtonText,
  ChevronRightIcon,
  HStack,
} from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { Pressable } from "@gluestack-ui/themed";
import { gql, useMutation, useQuery } from "@apollo/client";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";
import DateInput from "../../atoms/DateInput";
import { Icon } from "@gluestack-ui/themed";

type SecurityScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "Security"
>;

const SecurityScreen = () => {
  const { userId } = useContext(AuthContext);
  const { SignOut } = useContext(AuthContext);
  const navigation = useNavigation<SecurityScreenNavigationProps>();

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Edit Profile"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20}>
          <Pressable
            onPress={() => navigation?.navigate("ChangePassword")}
            backgroundColor="white"
            borderRadius={10}
            padding={20}
            marginBottom={20}
          >
            <HStack justifyContent="space-between" width="100%">
              <Text fontSize={17} fontFamily="$semibold">Change password</Text>
              <Icon as={ChevronRightIcon} size="xl"/>
            </HStack>
          </Pressable>
          <Pressable
            onPress={() => navigation?.navigate("ManageAccount")}
            backgroundColor="white"
            borderRadius={10}
            padding={20}
          >
            <HStack justifyContent="space-between" width="100%">
              <Text fontSize={17} fontFamily="$semibold">Manage account</Text>
              <Icon as={ChevronRightIcon} size="xl"/>
            </HStack>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SecurityScreen;
