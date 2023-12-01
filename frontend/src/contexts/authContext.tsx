import { User, onAuthStateChanged } from "firebase/auth";

import React from "react";
import { auth } from "@/firebase";

export const AuthContext = React.createContext<User | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData);
    });
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useUser = () => React.useContext(AuthContext);