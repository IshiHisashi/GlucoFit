import React, { useState, useContext } from "react";
import { View, Image, Text, HStack } from "@gluestack-ui/themed";
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
import { validateEmail } from "../../../utils/utilEmailValidatoin";

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
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(true);
  const navigation = useNavigation();
  const { LogIn, setUserId } = useContext(AuthContext);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const isPasswordInvalid = password.length < 6;

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailInvalid(!validateEmail(text));
  };

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
        <View marginTop={80} marginBottom={30} flexDirection="column">
          <Image
            source={require("../../../../assets/OnbordingChar.png")}
            resizeMode="contain"
            w={97}
            mx="auto"
            alt="Character is winking during the onboarding process"
          />
        </View>
        <Text
          marginBottom={40}
          color="black"
          textAlign="center"
          fontSize={28}
          fontFamily="$bold"
        >
          Welcome back!
        </Text>
        <View flexDirection="column" gap={20}>
          <HStack>
            <InputFieldGeneral
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              isRequired={true}
              isDisabled={false}
              isInvalid={isEmailInvalid}
              errorMessage={
                isEmailInvalid ? "Please provide a valid email address" : ""
              }
            />
          </HStack>
          <HStack>
            <InputFieldGeneral
              label="Password"
              value={password}
              onChangeText={setPassword}
              isRequired={true}
              isDisabled={false}
              isInvalid={isPasswordInvalid}
              type="password"
              errorMessage={
                isPasswordInvalid
                  ? "Password must be at least 6 characters long"
                  : ""
              }
              iconRight={EyeSlashCustom}
            />
          </HStack>
        </View>
      </View>

      <View marginBottom={48} flexDirection="column" gap={16}>
        <GlucoButton
          buttonType="primary"
          text="Sign in"
          isFocused={false}
          isDisabled={isEmailInvalid || isPasswordInvalid ? true : false}
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
