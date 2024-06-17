import LoginForm from "@/components/ui/AccessPage/LoginForm";
import RegisterForm from "@/components/ui/AccessPage/RegisterForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FunctionComponent } from "react";

interface AccessPageProps {}

const AccessPage: FunctionComponent<AccessPageProps> = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex justify-center items-center mt-12 md:mt-60">
          <Tabs
            defaultValue="Login"
            className="flex flex-col self-center w-fit"
          >
            <TabsList className="flex self-center">
              <TabsTrigger value="Login">Login</TabsTrigger>
              <TabsTrigger value="Register">Register</TabsTrigger>
            </TabsList>
            <TabsContent
              className="border border-slate-200 p-6 rounded-lg w-screen"
              value="Login"
            >
              <LoginForm />
            </TabsContent>
            <TabsContent
              className="border border-slate-200 p-6 rounded-lg w-screen"
              value="Register"
            >
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
        <div className="p-8 flex flex-col self-center text-center">
          <p>Dev options:</p>
          <Button className="my-4">Login as user</Button>
          <Button>Login as admin</Button>
          </div>
      </div>
    </>
  );
};

export default AccessPage;
