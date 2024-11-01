import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, saveToken, deleteToken } from "../utils/utilAuth";
import { jwtDecode } from "jwt-decode";

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

  useEffect(() => {
    // Fetch token from storage on app load
    const loadAuthData = async () => {
      const token = await getToken("accessToken");
      const id = await getToken("userId");
      const onboardingStatus = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );
      console.log(token);
      console.log(id);

      if (token) {
        setUserToken(token);

        // Decode the token to extract userId
        try {
          const decodedToken: any = jwtDecode(token);
          const id = decodedToken.userId;
          console.log(id);
          if (id) {
            setUserId(id);
          }
        } catch (error) {
          console.error("Failed to decode token", error);
        }
      }
      console.log("onboarding : ", onboardingStatus);
      if (onboardingStatus === "true") setHasCompletedOnboarding(true);
    };
    loadAuthData();
  }, []);

  const LogIn = async (token: string) => {
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
