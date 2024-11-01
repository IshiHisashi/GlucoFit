import React, { useState, useContext } from "react";
import {
  View,
  Image,
  Text,
  InputIcon,
  EyeOffIcon,
  Button,
  ButtonText,
  HStack,
} from "@gluestack-ui/themed";
import { gql, useMutation } from "@apollo/client";
import Input from "../../atoms/onboarding/input";
import { saveToken } from "../../../utils/utilAuth";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { TabParamList } from "../../../types/navigation";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";
import { EyeCustom, EyeSlashCustom } from "../../svgs/svgs";
import GlucoButton from "../../atoms/GlucoButton";

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
    <View
      height="100%"
      flexDirection="column"
      justifyContent="space-between"
      p={16}
    >
      <View>
        <View marginTop={50} flexDirection="column">
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
        <Text color="black" textAlign="center" fontSize={28} fontFamily="$bold">
          Welcome back!
        </Text>
        <View flexDirection="column" gap={20}>
          <HStack>
            <InputFieldGeneral
              label="Email"
              value={email}
              onChangeText={setEmail}
              isRequired={true}
              isDisabled={false}
              isInvalid={false}
              // errorMessage="this is error message"
            />
          </HStack>
          <HStack>
            <InputFieldGeneral
              label="Password"
              value={password}
              onChangeText={setPassword}
              isRequired={true}
              isDisabled={false}
              isInvalid={false}
              type="password"
              // errorMessage="this is error message"
              iconRight={EyeSlashCustom}
            />
          </HStack>
        </View>
      </View>

      <View marginBottom={0} flexDirection="column" gap={16}>
        <GlucoButton
          buttonType="primary"
          text="Sign in"
          isFocused={false}
          isDisabled={false}
          onPress={handleLogin}
        />
        <GlucoButton
          buttonType="secondary"
          text="New user? Create an account."
          isFocused={false}
          isDisabled={false}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
