import useAuth from "./useAuth";
import axios from "@/helpers/axios";
function useLogout() {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth(undefined);
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
}

export default useLogout;
