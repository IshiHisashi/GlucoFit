import { SafeAreaView, ScrollView, View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { Pressable } from "@gluestack-ui/themed";
import { gql, useQuery } from "@apollo/client";

const GET_USER_NAME = gql`
  query GetUser(
    $userId: ID!
  ) {
    getUser(
      id: $userId
    ) {
      name
    }
  }
`

type ProfileScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "Profile"
>;

const ProfileScreen = () => {

  const { userId } = useContext(AuthContext);
  const { SignOut } = useContext(AuthContext);
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const [userName, setUserName] = useState<string>("");

  const {data, loading, error} = useQuery(GET_USER_NAME, 
    {
      variables: { userId: userId }
    }
  )

  useEffect(() => {
    if (data.getUser?.name) {
      setUserName(data.getUser.name);
    }
  }, [data])

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="My Account"
          // rightIconOnPress={() => {}}
        />
        <ScrollView>
          <Text>Name: { userName }</Text>
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

export default ProfileScreen;