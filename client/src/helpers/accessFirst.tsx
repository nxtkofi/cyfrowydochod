import TextDefault from "@/components/ui/HomePage/TextDefault";
import Wrapper from "@/components/ui/wrapper";
import useAuth from "@/hooks/useAuth";
import useNavigation from "@/hooks/useNavigation";
import { Outlet } from "react-router-dom";

function AccessFirst() {
  const { auth } = useAuth();
  const navigate = useNavigation();

  return auth?.role == "commonUser" || auth?.role == "admin" ? (
    <Outlet />
  ) : (
    <>
      <Wrapper>
        <TextDefault variant="default" bigTitle center>
          Do you want to contact us?
          <br />
          <a
            className="cursor-pointer animated-underline thicker-underline w-fit leading-[5rem]"
            onClick={() => navigate({ path: "/access" })}
          >
            Login or register first
          </a>
        </TextDefault>
      </Wrapper>
      <Outlet />
    </>
  );
}

export default AccessFirst;
