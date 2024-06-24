import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { FunctionComponent, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import axios from "@/helpers/axios";
import useNavigation from "@/hooks/useNavigation";
import { userInputType, handleInputChangeType } from "@/types";

interface RegisterFormProps {}

const RegisterForm: FunctionComponent<RegisterFormProps> = () => {
  const navigate = useNavigation();
  const [userInput, setUserInput] = useState<userInputType>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange: handleInputChangeType = (inputValue, inputName) => {
    const value = inputValue.trim();
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
        handleChange={(value: string) => handleInputChange(value, "email")}
        value={userInput.email}
        guiName="Email"
        name="email"
        className="mt-12"
        preset="email"
        isLoading={false}
      />
      <Input
        handleChange={(value: string) => handleInputChange(value, "username")}
        value={userInput.username}
        guiName="Username"
        name="username"
        className="my-8"
        preset="username"
        isLoading={false}
      />
      <Input
        handleChange={(value: string) => handleInputChange(value, "password")}
        value={userInput.password}
        guiName="Password"
        name="password"
        type="password"
        className="my-8"
        preset="password"
        isLoading={false}
      />
      <Input
        handleChange={(value: string) =>
          handleInputChange(value, "repeatPassword")
        }
        guiName="Repeat password"
        type="password"
        className="my-8"
        preset="password"
        isLoading={false}
      />
      <div className="flex flex-row items-center  justify-between">
        <Button onClick={handleRegister}>Register</Button>
        <HoverCard>
          <HoverCardTrigger className="w-1/2">
            <div
              onClick={() => navigate({ path: "" })}
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
