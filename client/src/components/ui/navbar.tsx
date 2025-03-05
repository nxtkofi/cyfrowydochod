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
        <div className="flex flex-row justify-between m-8 md:mx-[10%] items-center font-semibold">
          <div
            className="cursor-pointer md:w-1/3"
            onMouseDown={() => navigate({ path: "/" })}
          >
            <HomeIcon className="md:hidden" />
            <p className="hidden md:flex">Home</p>
          </div>
          <div
            className="cursor-pointer"
            onMouseDown={() => navigate({ path: "/offer" })}
          >
            <BookIcon className="ml-16 md:hidden" />
            <p className="hidden md:flex">All e-books</p>
          </div>
          <div
            className="cursor-pointer"
            onMouseDown={() => navigate({ path: "/contact" })}
          >
            <p className="hidden md:flex">Contact</p>
            <PencilIcon className="md:hidden" />
          </div>
          {auth?.preferences ? (
            <img
              src={`/avatars/${auth?.preferences.avatar}.jpg`}
              className="w-10 h-10 rounded-full cursor-pointer"
              onMouseDown={handleMenuClick}
            />
          ) : (
            <div className="cursor-pointer" onClick={handleMenuClick}>
              <UserIcon className="md:hidden" />
              <p className="hidden md:flex">Login/Register</p>
            </div>
          )}
          <SideBar showSideBar={showSideBar} shown={sideBarVisible} />
        </div>
        <div className=" border-b-2"></div>
      </div>
    </>
  );
}

export default Navbar;
