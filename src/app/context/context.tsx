"use client";

import { createContext, useEffect, useState } from "react";
import { loginUser } from "../services/userService";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
};

type User = {
  name: string;
  email: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { token } = parseCookies();
    console.log();
    if (!token || token == undefined) {
      setUser(null);
      router.push("/login");
    }
  }, []);

  async function signIn(data: SignInData) {
    const response: any = await loginUser(data);

    const userData: User = {
      name: response.data.name,
      email: response.data.email,
    };

    setCookie(undefined, "token", response.data.token, {
      maxAge: 60 * 60 * 1,
      path: "/",
    });

    setUser(userData);

    router.push("/dashboard/homepage");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
