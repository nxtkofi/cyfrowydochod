import { HomeIcon, BookIcon, PencilIcon, UserIcon } from "lucide-react";
import SideBar from "./SideBar";
import { useState } from "react";
import useNavigation from "@/hooks/useNavigation";
import useAuth from "@/hooks/useAuth";

function Navbar() {
  const { auth } = useAuth();
  const navigate = useNavigation();
  const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
  const showSideBar = () => {
    console.log(sideBarVisible);
    setSideBarVisible(!sideBarVisible);
  };

  const handleMenuClick = () => {
    if (!auth?.accessToken) {
      navigate({ path: "/access" });
    } else {
      showSideBar();
    }
  };
  
  return (
    <>
      <div className="flex flex-row justify-between m-8">
        <div onMouseDown={() => navigate({ path: "/" })}>
          <HomeIcon />
        </div>

        <div onMouseDown={() => navigate({ path: "/offer" })}>
          <BookIcon className="ml-16" />
        </div>
        <div onMouseDown={() => navigate({ path: "/contact" })}>
          <PencilIcon />
        </div>
        <UserIcon onMouseDown={handleMenuClick} />
        <SideBar showSideBar={showSideBar} shown={sideBarVisible} />
      </div>
      <div className=" border-b-2"></div>
    </>
  );
}

export default Navbar;
