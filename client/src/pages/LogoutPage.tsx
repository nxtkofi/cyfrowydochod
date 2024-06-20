import useLogout from "@/hooks/useLogout";
import useNavigation from "@/hooks/useNavigation";
import { useEffect } from "react";

function LogoutPage() {
  const logout = useLogout();
  const navigate = useNavigation();
  useEffect(() => {
    logout();
    navigate({ path: "/" });
  }, []);
  return <></>;
}

export default LogoutPage;
