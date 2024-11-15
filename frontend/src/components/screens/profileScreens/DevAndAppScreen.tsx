import { SafeAreaView, ScrollView, View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { gql, useQuery } from "@apollo/client";

type DevAndAppScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "DevAndApp"
>;

const DevAndAppScreen = () => {

  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<DevAndAppScreenNavigationProps>();

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Edit Profile"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20}>
          <Text>We are GlucoFit!</Text>
          <Text>This is our gorgeous, talented, fantastic team members!!!</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default DevAndAppScreen;