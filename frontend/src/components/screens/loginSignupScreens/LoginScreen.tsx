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
        id
        email
      }
    }
  }
`;

const LoginScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();
  const { LogIn, setUserId } = useContext(AuthContext);
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
      const userID = data.login.user.id;
      await saveToken("refreshToken", refreshToken);
      await LogIn(accessToken);
      setUserId(userID);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
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
        Welcome back!
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
