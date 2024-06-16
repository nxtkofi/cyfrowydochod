import LoginForm from "@/components/ui/AccessPage/LoginForm";
import RegisterForm from "@/components/ui/AccessPage/RegisterForm";
import Navbar from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FunctionComponent } from "react";

interface AccessPageProps {}

const AccessPage: FunctionComponent<AccessPageProps> = () => {
  return (
    <>
      <Navbar />
        <div className="h-[60vh] flex justify-center items-center">
          <Tabs defaultValue="Login" className="flex flex-col self-center w-fit">
            <TabsList className="flex self-center">
              <TabsTrigger value="Login">Login</TabsTrigger>
              <TabsTrigger value="Register">Register</TabsTrigger>
            </TabsList>
            <TabsContent className="border border-slate-200 p-6 rounded-lg w-screen" value="Login">
                <LoginForm/>
            </TabsContent>
            <TabsContent className="border border-slate-200 p-6 rounded-lg" value="Register">
              <RegisterForm/>
            </TabsContent>
          </Tabs>
          
        </div>
    </>
  );
};

export default AccessPage;
