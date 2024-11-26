import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, saveToken, deleteToken } from "../utils/utilAuth";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_CURRENT_USER } from "../utils/query/authQuery";

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
  // uri: "https://backend.glucofit.ca/graphql",
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

  const fetchCurrentUser = async (token: string): Promise<any | null> => {
    try {
      const { data } = await client.query({
        query: GET_CURRENT_USER,
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      return data.currentUser;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch token from storage on app load
    const loadAuthData = async () => {
      const token = await getToken("accessToken");
      const onboardingStatus = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );

      if (token) {
        setUserToken(token);
        const currentUser = await fetchCurrentUser(token);
        if (currentUser?.id) {
          setUserId(currentUser.id);
        }

        if (onboardingStatus !== "true") {
          setShouldCheckOnboarding(false);
        } else {
          setHasCompletedOnboarding(true);
        }
      }
      if (onboardingStatus === "true") setHasCompletedOnboarding(true);
    };
    loadAuthData();
  }, []);

  const LogIn = async (token: string) => {
    await saveToken("accessToken", token);
    setUserToken(token);

    const currentUser = await fetchCurrentUser(token);
    if (currentUser?.id) {
      setUserId(currentUser.id);
    }

    const hasOnboarded = currentUser.has_onboarded;
    if (hasOnboarded) {
      setHasCompletedOnboarding(true);
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
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
