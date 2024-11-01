import React, { useState, useContext } from "react";
import { View, Image, Text, HStack } from "@gluestack-ui/themed";
import { gql, useMutation } from "@apollo/client";
import { saveToken } from "../../../utils/utilAuth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { LoginSignupStackParamList } from "../../../types/navigation";
import { AuthContext } from "../../../context/AuthContext";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";
import { EyeCustom, EyeSlashCustom } from "../../svgs/svgs";
import GlucoButton from "../../atoms/GlucoButton";

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
          Create an account
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
          text="Get Started!"
          isFocused={false}
          isDisabled={false}
          onPress={handleSignUp}
        />
        <GlucoButton
          buttonType="secondary"
          text="Have an accout? Sign in"
          isFocused={false}
          isDisabled={false}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

export default SignupScreen;
