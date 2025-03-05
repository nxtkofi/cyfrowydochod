import LoginForm from "@/components/ui/AccessPage/LoginForm";
import RegisterForm from "@/components/ui/AccessPage/RegisterForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "@/helpers/axios";
import useAuth from "@/hooks/useAuth";
import { RoleType } from "@/types";
import { jwtDecode } from "jwt-decode";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AccessPageProps {}
const LOGIN_PASS = {
  email: "test@email.com",
  password: "test",
};
const ADMIN_PASS = {
  email: "admin@email.com",
  password: "admin",
};
const AccessPage: FunctionComponent<AccessPageProps> = () => {
  //TODO: remove this before launch
  const ogNavigation = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { setAuth } = useAuth();
  const login = async (role: RoleType) => {
    const response = await axios.post(
      `/api/auth/login`,
      role === "commonUser" ? LOGIN_PASS : ADMIN_PASS,
      { withCredentials: true },
    );
    const accessToken = (await response!).data;
    const decodedToken = jwtDecode(accessToken);
    const userId = decodedToken.sub;
    const userRole = decodedToken.role;
    const userEmail = decodedToken.email;
    const userPreferences = decodedToken.userPrefs;

    if (userId != null && userRole != null && userEmail != null) {
      setAuth({
        id: userId,
        email: userEmail,
        accessToken: accessToken,
        username: decodedToken.username,
        role: userRole,
        preferences: userPreferences,
      });
      ogNavigation(from, { replace: true });
    }
  };
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
              className="border border-slate-200 p-6 rounded-lg w-screen lg:w-fit min-w-[420px]"
              value="Login"
            >
              <div className="flex flex-col">
                <LoginForm />
              </div>
            </TabsContent>
            <TabsContent
              className="border border-slate-200 p-6 rounded-lg w-screen lg:w-fit"
              value="Register"
            >
              <div className="flex flex-col">
                <RegisterForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="p-8 flex flex-col self-center text-center">
          <p>Dev options:</p>
          <Button className="my-4" onClick={() => login("commonUser")}>
            Login as user
          </Button>
          <Button onClick={() => login("admin")}>Login as admin</Button>
        </div>
      </div>
    </>
  );
};

export default AccessPage;
