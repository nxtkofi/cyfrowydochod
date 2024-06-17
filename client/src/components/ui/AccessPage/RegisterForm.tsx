import { HoverCard, HoverCardTrigger, HoverCardContent } from "@radix-ui/react-hover-card";
import { FunctionComponent } from "react";
import { Button } from "../button";
import { Input } from "../input";

interface RegisterFormProps {
    
}
 
const RegisterForm: FunctionComponent<RegisterFormProps> = () => {
    return (<>
     <p className="text-slate-500">Register new account.</p>
      <Input name="Email" className="mt-12" />
      <Input name="Username" className="my-8" />
      <Input name="Password" type="password" className="my-8" />
      <Input name="Repeat password" type="password" className="my-8" />
      <div className="flex flex-row items-center  justify-between">
        <Button>Register</Button>
        <HoverCard>
          <HoverCardTrigger className="w-1/2"><a href="" className="hover:underline relative">By registering you accept our privacy policy and agreements.</a></HoverCardTrigger>
          <HoverCardContent className="bg-black text-white text-base p-4 rounded-xl w-48 -left-40 absolute">
            We're gathering basic data just for our statistics purposes. We're not selling, sharing or borrowing your data with any company. Click to read more about how we're using data gathered by your behavior.            
          </HoverCardContent>
        </HoverCard>
        
      </div></>  );
}
 
export default RegisterForm;