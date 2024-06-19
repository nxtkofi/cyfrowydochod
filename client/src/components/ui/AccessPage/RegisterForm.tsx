import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import axios from "@/helpers/axios";
import useNavigation from "@/hooks/useNavigation";

interface RegisterFormProps {}

export type handleInputChangeType = (
  e: ChangeEvent<HTMLInputElement>,
  name: "email" | "username" | "password" | "repeatPassword"
) => void;

export type userInputType = {
  email: string;
  password: string;
  username?: string;
};

const RegisterForm: FunctionComponent<RegisterFormProps> = () => {
  const navigate = useNavigation();
  const [userInput, setUserInput] = useState<userInputType>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange: handleInputChangeType = (e, inputName) => {
    const value = e.target.value.trim();
    setUserInput((prev) => ({ ...prev, [inputName]: value }));
  };

  const handleRegister = async () => {
    try {
      const response = axios.post("/api/auth/register", userInput);
      console.log((await response).data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <p className="text-slate-500">Register new account.</p>
      <Input
        onChange={(e) => handleInputChange(e, "email")}
        value={userInput.email}
        guiName="Email"
        name="email"
        className="mt-12"
      />
      <Input
        onChange={(e) => handleInputChange(e, "username")}
        value={userInput.username}
        guiName="Username"
        name="username"
        className="my-8"
      />
      <Input
        onChange={(e) => handleInputChange(e, "password")}
        value={userInput.password}
        guiName="Password"
        name="password"
        type="password"
        className="my-8"
      />
      <Input guiName="Repeat password" type="password" className="my-8" />
      <div className="flex flex-row items-center  justify-between">
        <Button onClick={handleRegister}>Register</Button>
        <HoverCard>
          <HoverCardTrigger className="w-1/2">
            <div
              onClick={() => navigate({path:""})}
              className="hover:underline relative"
            >
              By registering you accept our privacy policy and agreements.
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="bg-black text-white text-base p-4 rounded-xl w-48 -left-40 absolute">
            We're gathering basic data just for our statistics purposes. We're
            not selling, sharing or borrowing your data with any company. Click
            to read more about how we're using data gathered by your behavior.
          </HoverCardContent>
        </HoverCard>
      </div>
    </>
  );
};

export default RegisterForm;
