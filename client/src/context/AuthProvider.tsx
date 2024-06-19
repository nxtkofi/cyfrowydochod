import { RoleType } from "@/types";
import { PropsWithChildren, createContext, useState } from "react";

type AuthType = {
  id: string;
  email: string;
  accessToken: string;
  role: RoleType;
};

type AuthContextType = {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthType | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
