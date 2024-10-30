import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getToken, saveToken, deleteToken } from "../utils/utilAuth";

type AuthContextProps = {
  userToken: string | null;
  LogIn: (token: string) => Promise<void>;
  SignOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  LogIn: async () => {},
  SignOut: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch token from storage on app load
    const loadToken = async () => {
      const token = await getToken("accessToken");
      if (token) {
        setUserToken(token);
      }
    };
    loadToken();
  }, []);

  const LogIn = async (token: string) => {
    console.log("login executed");
    await saveToken("accessToken", token);
    setUserToken(token);
  };

  const SignOut = async () => {
    await deleteToken("accessToken");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, LogIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
