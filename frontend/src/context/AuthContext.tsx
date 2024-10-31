import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getToken, saveToken, deleteToken } from "../utils/utilAuth";

type AuthContextProps = {
  userToken: string | null;
  userId: string | null;
  LogIn: (token: string) => Promise<void>;
  setUserId: (id: string) => void;
  SignOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  userId: null,
  LogIn: async () => {},
  setUserId: () => {},
  SignOut: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch token from storage on app load
    const loadAuthData = async () => {
      const token = await getToken("accessToken");
      const id = await getToken("userId");
      if (token) {
        setUserToken(token);
      }
      if (id) {
        setUserId(id);
      }
    };
    loadAuthData();
  }, []);

  const LogIn = async (token: string) => {
    console.log("login executed");
    await saveToken("accessToken", token);
    setUserToken(token);
  };

  const SignOut = async () => {
    await deleteToken("accessToken");
    setUserToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ userToken, userId, LogIn, setUserId, SignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
