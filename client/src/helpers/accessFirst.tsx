import TextDefault from "@/components/ui/HomePage/textDefault";
import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

function AccessFirst() {
  const { auth } = useAuth();

  return auth?.role == ("commonUser" || "admin") ? (
    <Outlet />
  ) : (<>
    <TextDefault variant="default" bigTitle center>
      Do you want to contact us? Login/Register first.
    </TextDefault>
    <Outlet />
    </>
  );
}

export default AccessFirst;
