import { RoleType } from "@/types";
import { PropsWithChildren, createContext, useState } from "react";

type AuthType = {
  id: string;
  email: string;
  accessToken: string;
  role: RoleType;
  username: string;
};

type AuthContextType = {
  auth: AuthType | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthType | undefined>>;
  persist: string | boolean;
  setPersist: React.Dispatch<React.SetStateAction<string | boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const storedPersist = localStorage.getItem("persist");
  const [persist, setPersist] = useState<string | boolean>(
    storedPersist ? JSON.parse(storedPersist) : false
  );
  const [auth, setAuth] = useState<AuthType | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
