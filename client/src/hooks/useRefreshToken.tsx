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
    const role = decoded.role;
    setAuth((prev) => {
      return { ...prev, accessToken: newAccessToken, role: role };
    });

    return res.data;
  };
  return refresh;
}

export default useRefreshToken;
