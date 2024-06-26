import useLogout from "@/hooks/useLogout";
import useNavigation from "@/hooks/useNavigation";
import { useEffect } from "react";

function LogoutPage() {
  const logout = useLogout();
  const navigate = useNavigation();
  useEffect(() => {
    const tryLogout = async ()=>{
      await logout();
      navigate({ path: "/" });
    }
    tryLogout()
  }, []);
  return <></>;
}

export default LogoutPage;
