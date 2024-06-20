import { jwtDecode } from "jwt-decode";
import { FunctionComponent, useEffect, useState } from "react";
import { Input } from "../input";
import { Button } from "../button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { handleInputChangeType, userInputType } from "./RegisterForm";
import axios from "@/helpers/axios";
import useAuth from "@/hooks/useAuth";
import { AxiosError } from "axios";
import useNavigation from "@/hooks/useNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "../checkbox";

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const location = useLocation();
  const [errMsg, setErrMsg] = useState<string>();
  const { persist, setPersist, setAuth } = useAuth();
  const [userInput, setUserInput] = useState<userInputType>({
    email: "",
    password: "",
  });
  const ogNavigation = useNavigate();
  const navigate = useNavigation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {
    try {
      const response = axios.post("/api/auth/login", userInput, {
        withCredentials: true,
      });
      const accessToken = (await response).data;
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.sub;
      const userRole = decodedToken.role;
      const userEmail = decodedToken.email;
      if (userId != null && userRole != null && userEmail != null) {
        setAuth({
          id: userId,
          email: userEmail,
          accessToken: accessToken,
          role: userRole,
        });
        ogNavigation(from, { replace: true });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error?.response) {
          setErrMsg("No server response.");
        } else {
          console.log(error);
        }
      }
    }
  };
  const handleInputChange: handleInputChangeType = (e, inputName) => {
    const value = e.target.value.trim();
    setUserInput((prev) => ({ ...prev, [inputName]: value }));
  };
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("persist", persist.toString());
  }, [persist]);
  return (
    <>
      <p className="text-slate-500"> Login to your account.</p>
      <Input
        onChange={(e) => handleInputChange(e, "email")}
        guiName="Email"
        name="email"
        className="mt-12"
      />
      <Input
        onChange={(e) => handleInputChange(e, "password")}
        guiName="Password"
        name="password"
        type="password"
        className="mt-8"
      />
      <div className="flex flex-row items-center">
        <Checkbox
          id="persist"
          onClick={togglePersist}
          checked={persist as boolean}
          className="my-8"
        />
        <p className="ml-2">Trust this device.</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button onClick={handleLogin}>Login</Button>
        <HoverCard>
          <HoverCardTrigger>
            <div
              onClick={() => navigate({ path: "/restorePassword" })}
              className="hover:underline relative"
            >
              Forgot password?
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="bg-black text-white text-base p-4 rounded-xl w-48 -left-40 absolute">
            Click here to recover your password.
          </HoverCardContent>
        </HoverCard>
      </div>
    </>
  );
};

export default LoginForm;
