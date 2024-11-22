import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { Pressable } from "@gluestack-ui/themed";
import { gql, useMutation, useQuery } from "@apollo/client";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";

// 🚨 ADD PROPER MUTATION LATER HERE 🚨

const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $userId: ID!
    $oldPassword: String!
    $newPassword: String!
  ) {
    resetPassword(
      userId: $userId
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`;

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
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const handleSubmit = async () => {
    try {
      if (newPassword !== confirmPassword) {
        console.log("Password not confirmed properly");
        return;
      }
      const result = await resetPassword({
        variables: {
          userId: userId,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      });
      console.log("Password properly reseted: ", result);

      navigation.navigate("EditProfile");
    } catch (e) {
      console.error("Error reseting password:", e);
    }
  };

  const readyToReset =
    oldPassword !== "" &&
    newPassword !== "" &&
    confirmPassword !== "" &&
    newPassword === confirmPassword;

  return (
    <SafeAreaView backgroundColor="white">
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Change Password"
          // rightIconOnPress={() => {}}
        />
        <ScrollView 
          padding={20}
          borderTopColor="#ECE5FF" 
          borderTopWidth={1}
        >
          <View marginBottom={20}>
            <InputFieldGeneral
              label="Current Password"
              value={oldPassword}
              onChangeText={setoldPassword}
              isRequired={true}
              isDisabled={false}
              isInvalid={false}
              placeholder="Enter your current password"
            />
          </View>
          <View marginBottom={20}>
            <InputFieldGeneral
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              isRequired={true}
              isDisabled={false}
              isInvalid={false}
              placeholder="Enter a new password"
            />
          </View>
          <View marginBottom={20}>
            <InputFieldGeneral
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isRequired={true}
              isDisabled={false}
              isInvalid={false}
              placeholder="Enter the new password to confirm"
            />
          </View>
          <Button
            onPress={handleSubmit}
            disabled={!readyToReset}
            backgroundColor={readyToReset ? "#4800FF" : "#F2F1F5"}
            borderRadius={30}
            height={52}
            marginTop={20}
          >
            <ButtonText 
              fontSize={17} 
              fontFamily="$bold" 
              color={readyToReset ? "white" : "#C2C2C2"}
            >
              Save
            </ButtonText>
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
