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
import { validateEmail } from "../../../utils/utilEmailValidatoin";

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
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(true);
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const { setUserId } = useContext(AuthContext);

  const isPasswordInvalid = password.length < 6;

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsEmailInvalid(!validateEmail(text));
  };

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
      console.error("Signup error", error);
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
        <View marginTop={80} marginBottom={30} flexDirection="column">
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
        <Text
          marginBottom={40}
          color="black"
          textAlign="center"
          fontSize={28}
          fontFamily="$bold"
        >
          Create an account
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
          text="Get Started!"
          isFocused={false}
          isDisabled={!isEmailInvalid && !isPasswordInvalid ? false : true}
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
