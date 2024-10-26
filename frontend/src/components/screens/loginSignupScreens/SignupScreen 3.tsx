import React, { useState } from "react";
import {
  View,
  Text,
  InputIcon,
  EyeOffIcon,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { ApolloClient, InMemoryCache, gql, useMutation } from "@apollo/client";
import Input from "../../atoms/onboarding/input";
import { saveToken } from "../../../utils/utilAuth";

// GraphQL Mutation for Signup
const SIGNUP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        email
      }
    }
  }
`;

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);

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
      await saveToken("accessToken", accessToken);
      await saveToken("refreshToken", refreshToken);
      alert(`Signup successful! Token saved.`);
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
      <Text textAlign="center" fontSize={24} fontWeight={600}>
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
