import { jwtDecode } from "jwt-decode";
import { FunctionComponent, useEffect, useState } from "react";
import { Input } from "../input";
import { Button } from "../button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import axios from "@/helpers/axios";
import useAuth from "@/hooks/useAuth";
import { AxiosError } from "axios";
import useNavigation from "@/hooks/useNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "../checkbox";
import { handleInputChangeType, userInputType } from "@/types";

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const location = useLocation();
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
          username: decodedToken.username,
          role: userRole,
        });
        ogNavigation(from, { replace: true });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error?.response) {
          console.log("No server response.");
        } else {
          console.log(error);
        }
      }
    }
  };
  const handleInputChange: handleInputChangeType = (inputValue, inputName) => {
    setUserInput((prev) => ({ ...prev, [inputName]: inputValue }));
    console.log(userInput);
  };
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("persist", persist.toString());
  }, [persist]);
  return (
    <>
      <p className="text-slate-500 mb-4"> Login to your account.</p>
      <Input
        handleChange={(value: string) => handleInputChange(value, "email")}
        guiName="Email"
        name="email"
        preset="email"
      />
      <Input
        handleChange={(value: string) => handleInputChange(value, "password")}
        preset="username"
        guiName="Password"
        name="password"
        type="password"
      />
      <div className="flex flex-row items-center">
        <Checkbox
          id="persist"
          onClick={togglePersist}
          checked={persist as boolean}
          className="my-4"
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
