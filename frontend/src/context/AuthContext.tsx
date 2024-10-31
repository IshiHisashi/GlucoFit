import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getToken, saveToken, deleteToken } from "../utils/utilAuth";

type AuthContextProps = {
  userToken: string | null;
  userID: string | null;
  LogIn: (token: string) => Promise<void>;
  setUserID: (id: string) => void;
  SignOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  userID: null,
  LogIn: async () => {},
  setUserID: () => {},
  SignOut: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    // Fetch token from storage on app load
    const loadAuthData = async () => {
      const token = await getToken("accessToken");
      const id = await getToken("userID");
      if (token) {
        setUserToken(token);
      }
      if (id) {
        setUserID(id);
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
    setUserID(null);
  };

  return (
    <AuthContext.Provider
      value={{ userToken, userID, LogIn, setUserID, SignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
