import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, saveToken, deleteToken } from "../utils/utilAuth";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@apollo/client";
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

  const userOnboardingStatus = ({ userId }: { userId: string }) => {
    // Use the useQuery hook to fetch the user data
    const { loading, error, data } = useQuery(GET_USER_HAS_ONBOARDED, {
      variables: { id: userId },
    });
    const { has_onboarded } = data.getUser;

    return has_onboarded;
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

  const { loading, error, data } = useQuery(GET_USER_HAS_ONBOARDED, {
    variables: { id: userId },
    skip: !userId || !shouldCheckOnboarding,
  });

  const LogIn = async (token: string) => {
    if (!loading && data) {
      const has_onboarded = data.getUser.has_onboarded;
      if (has_onboarded) {
        setHasCompletedOnboarding(true);
        AsyncStorage.setItem("hasCompletedOnboarding", "true");
      }
    }
    console.log("login executed");
    await saveToken("accessToken", token);
    setUserToken(token);
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
