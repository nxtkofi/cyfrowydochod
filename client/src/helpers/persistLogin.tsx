import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";
import useAuth from "@/hooks/useAuth";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { auth, persist } = useAuth();
  const refresh = useRefreshToken();
  
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.preferences.avatar ? verifyRefreshToken() : setIsLoading(false);
    console.log(auth);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${auth?.accessToken}`);
  }, [isLoading]);
  return (
    <>{!persist ? <div className="pt-20"><Outlet /></div> : isLoading ? <p>Loading...</p> : <div className="pt-20"><Outlet /></div>}</>
  );
}

export default PersistLogin;
