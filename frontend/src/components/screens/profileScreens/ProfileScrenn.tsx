import { SafeAreaView, ScrollView, View, Text, Pressable, VStack, HStack, Icon, ChevronRightIcon } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
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
        <ScrollView padding={20}>
          <Pressable 
            onPress={() => navigation?.navigate("EditProfile")}
            backgroundColor="white"
            borderRadius={10}
            padding={20}
          >
            <Text>Name: { userName }</Text>        
            <Text>Edit Profile</Text>    
          </Pressable>
          <VStack>
            <Text>Health</Text>
            <Pressable>
              <HStack justifyContent="space-between" width="100%">
                <Text>Health Data</Text>
                <Icon as={ChevronRightIcon}/>
              </HStack>
            </Pressable>
            <Pressable onPress={() => navigation?.navigate("Medications")}>
              <HStack justifyContent="space-between" width="100%">
                <Text>Medication</Text>
                <Icon as={ChevronRightIcon}/>
              </HStack>
            </Pressable>
            <Pressable>
              <HStack justifyContent="space-between" width="100%">
                <Text>Dev and Apps</Text>
                <Icon as={ChevronRightIcon}/>
              </HStack>
            </Pressable>
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen;