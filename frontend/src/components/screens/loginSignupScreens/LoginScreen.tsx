import React, { useState, useContext } from "react";
import {
  View,
  Text,
  InputIcon,
  EyeOffIcon,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { gql, useMutation } from "@apollo/client";
import Input from "../../atoms/onboarding/input";
import { saveToken } from "../../../utils/utilAuth";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { TabParamList } from "../../../types/navigation";

type Props = NativeStackScreenProps<TabParamList>;

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

const LoginScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();
  const { LogIn } = useContext(AuthContext);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try {
      const { data } = await login({ variables: { email, password } });
      // alert(`Login successful! Token saved.`);
      const accessToken = data.login.accessToken;
      const refreshToken = data.login.refreshToken;
      console.log("exe");
      await saveToken("refreshToken", refreshToken);
      await LogIn(accessToken);
      // navigation.navigate("Home");
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
