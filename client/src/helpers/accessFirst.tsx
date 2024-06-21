import TextDefault from "@/components/ui/HomePage/textDefault";
import Wrapper from "@/components/ui/wrapper";
import useAuth from "@/hooks/useAuth";
import useNavigation from "@/hooks/useNavigation";
import { Outlet } from "react-router-dom";

function AccessFirst() {
  const { auth } = useAuth();
  const navigate = useNavigation();

  return auth?.role == ("commonUser" || "admin") ? (
    <Outlet />
  ) : (
    <>
      <Wrapper>
        <TextDefault variant="default" bigTitle center>
          Do you want to contact us?
          <div className="underline md:no-underline md:hover:underline" onClick={()=>navigate({path:"/access"})}>Login/Register first.</div>
        </TextDefault>
      </Wrapper>
      <Outlet />
    </>
  );
}

export default AccessFirst;
