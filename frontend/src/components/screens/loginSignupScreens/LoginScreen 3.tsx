import React, { useState } from "react";
import {
  View,
  Text,
  InputIcon,
  EyeOffIcon,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useMutation,
  ApolloProvider,
} from "@apollo/client";
import Input from "../../atoms/onboarding/input";
import { saveToken } from "../../../utils/utilAuth";

// GraphQL Mutation for Login
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        email
      }
    }
  }
`;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try {
      const { data } = await login({ variables: { email, password } });
      const accessToken = data.login.accessToken;
      const refreshToken = data.login.refreshToken;
      await saveToken("accessToken", accessToken);
      await saveToken("refreshToken", refreshToken);
      alert(`Login successful! Token saved.`);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <View flexDirection="column" gap={20} p={16}>
      <Text textAlign="center" fontSize={24} fontWeight={600}>
        Welcome back
      </Text>
      <Input labelText="Email" onChange={setEmail} />
      <Input labelText="Password" onChange={setPassword}>
        <InputIcon as={EyeOffIcon} height={40} />
      </Input>
      <Button bgColor="#888" onPress={handleLogin} disabled={loading}>
        <ButtonText>Sign in</ButtonText>
      </Button>
    </View>
  );
};

export default LoginScreen;
