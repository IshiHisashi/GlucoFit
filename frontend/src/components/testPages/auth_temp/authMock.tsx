import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { Button, ButtonText, Text, View } from "@gluestack-ui/themed";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";
import { saveToken } from "./utils/utilAuth"; // Import the utility function to store the token

// PLEASE INPUT YOUR IP WHEN YOU TEST
const IP = "";

// GraphQL Mutation for Signup
const SIGNUP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

// GraphQL Mutation for Login
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

const client = new ApolloClient({
  uri: `http://${IP}:5000/graphql`, // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const AuthMock: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // State for email
  const [password, setPassword] = useState<string>(""); // State for password
  const [token, setToken] = useState<string | null>(null); // State for token

  // Handle Signup without useMutation
  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const { data } = await client.mutate({
        mutation: SIGNUP_MUTATION,
        variables: { email, password },
      });

      const token = data.signUp.token;
      await saveToken("jwtToken", token); // Save the token in secure storage
      setToken(token); // Set token to state
      alert(`Signup successful! Token saved.`);
    } catch (error: any) {
      console.error("Signup error:", error); // Log the full error response
      if (error.networkError) {
        console.error("Network Error:", error.networkError);
      }
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(
            `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }
      alert("Signup failed");
    }
  };

  // Handle Login without useMutation
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password: password },
      });

      const token = data.login.token;
      await saveToken("jwtToken", token); // Save the token in secure storage
      setToken(token); // Set token to state
      alert(`Login successful! Token saved.`);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <View style={styles.container}>
      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button onPress={handleSignUp}>
            <ButtonText>Sign up</ButtonText>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={handleLogin}>
            <ButtonText>Log in</ButtonText>
          </Button>
        </View>
      </View>

      {token && <Text style={styles.tokenText}>Stored Token: {token}</Text>}
    </View>
  );
};

// Wrap your app with ApolloProvider
const App = () => (
  <ApolloProvider client={client}>
    <AuthMock />
  </ApolloProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
    display: "flex",
  },
  buttonContainer: {
    marginBottom: 50,
  },
  tokenText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default App;
