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

const GET_USER_GENERAL_DATA = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      name
      birthday
      email
    }
  }
`;

const UPDATE_USER_GENERAL_DATA = gql`
  mutation UpdateUser(
    $userId: ID!
    $name: String
    $birthday: Date
    $email: String
  ) {
    updateUser(id: $userId, name: $name, birthday: $birthday, email: $email) {
      name
      birthday
      email
    }
  }
`;

type EditProfileScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "EditProfile"
>;

const EditProfileScreen = () => {
  const { userId } = useContext(AuthContext);
  const { SignOut } = useContext(AuthContext);
  const navigation = useNavigation<EditProfileScreenNavigationProps>();
  const [userName, setUserName] = useState<string>("");
  const [userBday, setUserBday] = useState<Date>(new Date());
  const [userEmail, setUserEmail] = useState<string>("");
  const [initialName, setInitialName] = useState<string>("");
  const [initialBday, setInitialBday] = useState<Date>(new Date());
  const [initialEmail, setInitialEmail] = useState<string>("");
  const { data, loading, error, refetch } = useQuery(GET_USER_GENERAL_DATA, {
    variables: { userId: userId },
    fetchPolicy: "cache-and-network",
  });
  const [updateUserGeneralData] = useMutation(UPDATE_USER_GENERAL_DATA);

  useEffect(() => {
    if (data?.getUser) {
      setUserName(data.getUser.name);
      setUserBday(new Date(data.getUser.birthday));
      setUserEmail(data.getUser.email);

      // Set initial values for comparison
      setInitialName(data.getUser.name);
      setInitialBday(new Date(data.getUser.birthday));
      setInitialEmail(data.getUser.email);
    }
  }, [data]);

  // Update data on the screen
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleSubmit = async () => {
    try {
      const stringDate = userBday.toISOString();
      const updatedData = await updateUserGeneralData({
        variables: {
          userId: userId,
          name: userName,
          birthday: stringDate,
          email: userEmail,
        },
      });
      console.log("updated data: ", updatedData);

      setInitialName(userName);
      setInitialBday(userBday);
      setInitialEmail(userEmail);
    } catch (e) {
      console.error("Error updating data:", e);
    }
  };

  const isChanged =
    userName !== initialName ||
    userBday.getFullYear() !== initialBday.getFullYear() ||
    userBday.getMonth() !== initialBday.getMonth() ||
    userBday.getDate() !== initialBday.getDate() ||
    userEmail !== initialEmail;

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Edit Profile"
          // rightIconOnPress={() => {}}
        />
        <ScrollView padding={20}>
          <View marginBottom={20}>
            <InputFieldGeneral
              label="Name"
              value={userName}
              onChangeText={setUserName}
              isRequired={true}
              isDisabled={false}
              isInvalid={false}
              placeholder="Preferred Name"
            />
          </View>
          <View marginBottom={20}>
            {/* 🚨 Fix this date input field later 🚨 */}
            <DateInput
              value={userBday}
              isDisabled={false}
              labelText="Birthday"
              onChange={setUserBday}
              placeHolder="DD/MM/YYYY"
            />
          </View>
          <View marginBottom={20}>
            <InputFieldGeneral
              label="Email"
              value={userEmail}
              onChangeText={setUserEmail}
              isRequired={false}
              isDisabled={false}
              isInvalid={false}
              placeholder="Preferred Name"
            />
          </View>
          <Button
            marginBottom={20}
            height={52}
            borderRadius={26}
            onPress={handleSubmit}
            isDisabled={!isChanged}
            backgroundColor="#4800FF"
          >
            <ButtonText fontSize={17} fontFamily="$bold">Save</ButtonText>
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
