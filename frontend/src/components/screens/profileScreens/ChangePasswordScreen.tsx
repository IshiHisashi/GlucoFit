import { SafeAreaView, ScrollView, View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { Pressable } from "@gluestack-ui/themed";
import { gql, useQuery } from "@apollo/client";

// 🚨 ADD PROPER MUTATION LATER HERE 🚨

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

type ChangePasswordScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "ChangePassword"
>;

const ChangePasswordScreen = () => {

  const { userId } = useContext(AuthContext);
  const { SignOut } = useContext(AuthContext);
  const navigation = useNavigation<ChangePasswordScreenNavigationProps>();
  const [oldPassword, setoldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirtmPassword, setConfirmPassword] = useState<string>("");

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
          text="Change Password"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20}>
          <Text>Change password here</Text>
          <Button>
            <ButtonText>
              Save
            </ButtonText>
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen;