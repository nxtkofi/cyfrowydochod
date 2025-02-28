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
      <div className="fixed w-screen bg-white z-50">
        <div className="flex flex-row justify-between m-8 md:mx-[25%] items-center">
          <div
            className="cursor-pointer"
            onMouseDown={() => navigate({ path: "/" })}
          >
            <HomeIcon />
          </div>

          <div
            className="cursor-pointer"
            onMouseDown={() => navigate({ path: "/offer" })}
          >
            <BookIcon className="ml-16" />
          </div>
          <div
            className="cursor-pointer"
            onMouseDown={() => navigate({ path: "/contact" })}
          >
            <PencilIcon />
          </div>

          {auth?.preferences ? (
            <img
              src={`/avatars/${auth?.preferences.avatar}.jpg`}
              className="w-10 h-10 rounded-full cursor-pointer"
              onMouseDown={handleMenuClick}
            />
          ) : (
            <UserIcon className="cursor-pointer" onClick={handleMenuClick} />
          )}
          <SideBar showSideBar={showSideBar} shown={sideBarVisible} />
        </div>
        <div className=" border-b-2"></div>
      </div>
    </>
  );
}

export default Navbar;
