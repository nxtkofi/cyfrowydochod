import { HomeIcon, BookIcon, PencilIcon, UserIcon } from "lucide-react";
import SideBar from "./SideBar";
import { useState } from "react";

function Navbar() {
  const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
  const showSideBar = () => {
    console.log(sideBarVisible);
    setSideBarVisible(!sideBarVisible);
  };
  return (
    <>
      <div className="flex flex-row justify-between m-8">
        <a href="/">
          <HomeIcon />
        </a>

        <a href="/offer">
          <BookIcon className="ml-16" />
        </a>
        <a href="/contact">
          <PencilIcon />
        </a>
        <UserIcon onClick={showSideBar} />
        <SideBar showSideBar={showSideBar} shown={sideBarVisible} />
      </div>
      <div className=" border-b-2"></div>
    </>
  );
}

export default Navbar;
