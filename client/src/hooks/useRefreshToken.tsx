import axios from "@/helpers/axios";
import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get("/api/auth/refresh", {
      withCredentials: true,
    });
    const newAccessToken = res.data;
    const decoded = jwtDecode(newAccessToken);
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: newAccessToken,
        role: decoded.role,
        id: decoded.sub as string,
        username: decoded.username,
        email: decoded.email,
        preferences:decoded.userPrefs,
      };
    });

    return res.data;
  };
  return refresh;
}

export default useRefreshToken;
