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
import { useToast } from "../use-toast";

interface RegisterFormProps {}

const RegisterForm: FunctionComponent<RegisterFormProps> = () => {
  const [registrationStatus, setRegistrationStatus] = useState<
    "success" | "error" | null
  >(null);
  const { toast } = useToast();
  const navigate = useNavigation();
  const [errors, setErrors] = useState({
    email: true,
    username: true,
    password: true,
    repeatPassword: true,
  });
  const [userInput, setUserInput] = useState<userInputType>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange: handleInputChangeType = (inputValue, inputName) => {
    const value = inputValue.trim();
    setUserInput((prev) => ({ ...prev, [inputName]: value }));
    console.log(userInput);
  };

  const handleRegister = async () => {
    try {
      const response = axios.post("/api/auth/register", {
        username: userInput.username,
        email: userInput.email,
        password: userInput.password,
      });
      console.log((await response).data);
      if ((await response).status == 201) {
        toast({
          title: "Registered",
          description: "Registration succesfull. You can now log in!",
        });
        setRegistrationStatus("success");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't register. Try again later.",
        variant: "destructive",
      });
      setRegistrationStatus("error");
    }
  };
  return (
    <>
      <p className="text-slate-500 mb-4">Register new account.</p>
      <Input
        handleChange={(value: string) => handleInputChange(value, "email")}
        setParentError={(hasError) =>
          setErrors((prev) => ({ ...prev, email: hasError }))
        }
        guiName="Email"
        name="email"
        preset="email"
      />
      <Input
        setParentError={(hasError) => {
          setErrors((prev) => ({ ...prev, username: hasError }));
        }}
        handleChange={(value: string) => handleInputChange(value, "username")}
        guiName="Username"
        name="username"
        preset="username"
      />
      <Input
        setParentError={(hasError) =>
          setErrors((prev) => ({ ...prev, password: hasError }))
        }
        handleChange={(value: string) => handleInputChange(value, "password")}
        guiName="Password"
        name="password"
        type="password"
        preset="password"
      />
      <Input
        setParentError={(hasError) =>
          setErrors((prev) => ({
            ...prev,
            repeatPassword: hasError,
          }))
        }
        handleChange={(value: string) =>
          handleInputChange(value, "repeatPassword")
        }
        guiName="Repeat password"
        type="password"
        preset="password"
      />
      <div className="flex flex-row items-center  justify-between">
        <Button
          onClick={handleRegister}
          disabled={
            errors.email ||
            errors.password ||
            errors.username ||
            errors.repeatPassword ||
            !userInput.username ||
            !userInput.email ||
            !userInput.password ||
            !userInput.repeatPassword ||
            userInput.password !== userInput.repeatPassword
          }
        >
          {registrationStatus == null
            ? "Register"
            : registrationStatus == "success"
              ? "Success!"
              : "Try again"}
        </Button>
        <HoverCard>
          <HoverCardTrigger className="w-1/2">
            <div
              onClick={() => navigate({ path: "" })}
              className="hover:underline relative cursor-pointer"
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
