import { SafeAreaView, ScrollView, View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { Pressable } from "@gluestack-ui/themed";
import { gql, useQuery } from "@apollo/client";

// const GET_USER_GENERAL_DATA = gql`
//   query GetUser(
//     $userId: ID!
//   ) {
//     getUser(
//       id: $userId
//     ) {
//       name
//       birthday
//       email
//     }
//   }
// `

type ManageAccountScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "ManageAccount"
>;

const ManageAccountScreen = () => {

  const { userId } = useContext(AuthContext);
  const { SignOut } = useContext(AuthContext);
  const navigation = useNavigation<ManageAccountScreenNavigationProps>();

  // const {data, loading, error} = useQuery(GET_USER_GENERAL_DATA, 
  //   {
  //     variables: { userId: userId }
  //   }
  // )

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Manage Account"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20}>
          <Button onPress={SignOut}>
            <ButtonText>
              Sign out
            </ButtonText>
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ManageAccountScreen;