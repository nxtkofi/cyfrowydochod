import { FunctionComponent } from "react";
import { Input } from "../input";
import { Button } from "../button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  return (
    <>
      <p className="text-slate-500"> Login to your account.</p>
      <Input name="Email" className="mt-12" />
      <Input name="Password" type="password" className="my-8" />
      <div className="flex flex-row items-center justify-between">
        <Button>Login</Button>
        <HoverCard>
          <HoverCardTrigger><a href="" className="hover:underline relative">Forgot password?</a></HoverCardTrigger>
          <HoverCardContent className="bg-black text-white text-base p-4 rounded-xl w-48 -left-40 absolute">
            Click here to recover your password.            
          </HoverCardContent>
        </HoverCard>
      </div>
    </>
  );
};

export default LoginForm;
