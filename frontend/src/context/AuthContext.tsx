import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, saveToken, deleteToken } from "../utils/utilAuth";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GET_USER_HAS_ONBOARDED } from "../utils/query/onboardingQuery";

type AuthContextProps = {
  userToken: string | null;
  userId: string | null;
  hasCompletedOnboarding: boolean;
  LogIn: (token: string) => Promise<void>;
  setUserId: (id: string) => void;
  setOnboardingComplete: () => Promise<void>;
  SignOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const client = new ApolloClient({
  uri: "http://10.128.204.183:3000/graphql",
  cache: new InMemoryCache(),
});

export const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  userId: null,
  hasCompletedOnboarding: false,
  LogIn: async () => {},
  setUserId: () => {},
  setOnboardingComplete: async () => {},
  SignOut: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [shouldCheckOnboarding, setShouldCheckOnboarding] = useState(false);

  useEffect(() => {
    // Fetch token from storage on app load
    const loadAuthData = async () => {
      const token = await getToken("accessToken");
      const onboardingStatus = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );

      if (token) {
        setUserToken(token);

        // Decode the token to extract userId
        try {
          const decodedToken: any = jwtDecode(token);
          const id = decodedToken.userId;
          console.log("decoded", id);
          if (id) {
            setUserId(id);
          }
        } catch (error) {
          console.error("Failed to decode token", error);
        }
        if (onboardingStatus !== "true") {
          setShouldCheckOnboarding(true);
        } else {
          setHasCompletedOnboarding(true);
        }
      }
      console.log("onboarding : ", onboardingStatus);
      if (onboardingStatus === "true") setHasCompletedOnboarding(true);
    };
    loadAuthData();
  }, []);

  const fetchUserOnboardingStatus = async (id: string) => {
    try {
      const { data } = await client.query({
        query: GET_USER_HAS_ONBOARDED,
        variables: { id },
      });
      return data.getUser.has_onboarded;
    } catch (error) {
      console.error("Error fetching onboarding status:", error);
      return false;
    }
  };

  const LogIn = async (token: string) => {
    console.log("login executed");
    await saveToken("accessToken", token);
    setUserToken(token);

    // Decode the token to extract userId and check onboarding status
    try {
      const decodedToken: any = jwtDecode(token);
      const id = decodedToken.userId;
      if (id) {
        setUserId(id);
        const hasOnboarded = await fetchUserOnboardingStatus(id);
        console.log("hasOnboarded", hasOnboarded);
        if (hasOnboarded) {
          setHasCompletedOnboarding(true);
          await AsyncStorage.setItem("hasCompletedOnboarding", "true");
        }
      }
    } catch (error) {
      console.error("Failed to decode token or fetch onboarding status", error);
    }
  };

  const setOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error("Error saving onboarding status", error);
    }
  };

  const SignOut = async () => {
    await deleteToken("accessToken");
    setUserToken(null);
    setUserId(null);
    setHasCompletedOnboarding(false);
    await AsyncStorage.setItem("hasCompletedOnboarding", "false");
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userId,
        hasCompletedOnboarding,
        LogIn,
        setUserId,
        setOnboardingComplete,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
