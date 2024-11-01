import React, { useState, useContext } from "react";
import {
  View,
  Image,
  Text,
  InputIcon,
  EyeOffIcon,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { gql, useMutation } from "@apollo/client";
import Input from "../../atoms/onboarding/input";
import { saveToken } from "../../../utils/utilAuth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { LoginSignupStackParamList } from "../../../types/navigation";
import { AuthContext } from "../../../context/AuthContext";

type Props = NativeStackScreenProps<LoginSignupStackParamList>;

// GraphQL Mutation for Signup
const SIGNUP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        email
      }
    }
  }
`;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const { setUserId } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const { data } = await signUp({
        variables: { email, password },
      });
      const accessToken = data.signUp.accessToken;
      const refreshToken = data.signUp.refreshToken;
      const userID = data.signUp.user.id;
      await saveToken("accessToken", accessToken);
      await saveToken("refreshToken", refreshToken);
      setUserId(userID);
      alert(`Signup successful! Token saved.`);
      navigation.navigate("OnboardingStack");
    } catch (err: any) {
      console.error("Signup error:", err);
      if (err.networkError) {
        console.error("Network Error:", err.networkError);
      }
      if (err.graphQLErrors) {
        err.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(
            `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }
      alert("Signup failed");
    }
  };

  return (
    <View flexDirection="column" gap={20} p={16}>
      <View marginTop={80} flexDirection="column">
        <Image
          source={require("../../../../assets/OnbordingChar.png")}
          resizeMode="contain"
          w={68}
          mx="auto"
          alt="Character is winking during the onboarding process"
        />
        <Image
          source={require("../../../../assets/logo_onbording.png")}
          resizeMode="contain"
          w={190}
          mx="auto"
          alt="Character is winking during the onboarding process"
        />
      </View>
      <Text textAlign="center" fontSize={28}>
        Create an account
      </Text>
      <Input labelText="Email" onChange={setEmail} />
      <Input labelText="Password" onChange={setPassword}>
        <InputIcon as={EyeOffIcon} height={40} />
      </Input>
      <Button bgColor="#888" onPress={handleSignUp} disabled={loading}>
        <ButtonText>Get started!</ButtonText>
      </Button>
    </View>
  );
};

export default SignupScreen;
