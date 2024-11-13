import { SafeAreaView, ScrollView, View, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { Pressable } from "@gluestack-ui/themed";
import { gql, useQuery } from "@apollo/client";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";
import DateInput from "../../atoms/DateInput";

const GET_USER_GENERAL_DATA = gql`
  query GetUser(
    $userId: ID!
  ) {
    getUser(
      id: $userId
    ) {
      name
      birthday
      email
    }
  }
`

type EditProfileScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "EditProfile"
>;

const EditProfileScreen = () => {

  const { userId } = useContext(AuthContext);
  const { SignOut } = useContext(AuthContext);
  const navigation = useNavigation<EditProfileScreenNavigationProps>();
  const [userName, setUserName] = useState<string>("");
  const [userBday, setUserBday] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const {data, loading, error} = useQuery(GET_USER_GENERAL_DATA, 
    {
      variables: { userId: userId }
    }
  )

  useEffect(() => {
    console.log(data)
    if (data?.getUser?.name) {
      setUserName(data.getUser.name);
    }
    if (data?.getUser?.birthday) {
      setUserBday(data.getUser.birthday);
    }
    if (data?.getUser?.name) {
      setUserEmail(data.getUser.email);
    }
  }, [data])

  useEffect(() => {
    console.log(userBday);
  }, [userBday])

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Edit Profile"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20}>
          <InputFieldGeneral
            label="Name"
            value={userName}
            onChangeText={setUserName}
            isRequired={true}
            isDisabled={false}
            isInvalid={false}
            placeholder="Preferred Name"
          />
          {/* 🚨 Fix this date input field later 🚨 */}
          <DateInput 
            value={userBday}
            isDisabled={false}
            labelText="Birthday"
            onChange={setUserBday}
            placeHolder="DD/MM/YYYY"
          />
          <InputFieldGeneral
            label="Email"
            value={userEmail}
            onChangeText={setUserEmail}
            isRequired={false}
            isDisabled={false}
            isInvalid={false}
            placeholder="Preferred Name"
          />
          <Text>Name: { userName }</Text>
          <Text>Birthday: { userBday }</Text>
          <Text>Email: { userEmail }</Text>
          <Button>
            <ButtonText>
              Save
            </ButtonText>
          </Button>
          <Pressable 
            onPress={() => navigation?.navigate("ChangePassword")}
            backgroundColor="white"
            borderRadius={10}
            padding={20}
          >
            <Text>
              Change password
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => navigation?.navigate("ManageAccount")}
            backgroundColor="white"
            borderRadius={10}
            padding={20}
          >
            <Text>
              Manage account
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default EditProfileScreen;