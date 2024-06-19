import { HomeIcon, BookIcon, PencilIcon, UserIcon } from "lucide-react";
import SideBar from "./SideBar";
import { useState } from "react";
import useNavigation from "@/hooks/useNavigation";

function Navbar() {
  const navigate = useNavigation();
  const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
  const showSideBar = () => {
    console.log(sideBarVisible);
    setSideBarVisible(!sideBarVisible);
  };

  return (
    <>
      <div className="flex flex-row justify-between m-8">
        <div onClick={() => navigate({path:"/"})}>
          <HomeIcon />
        </div>

        <div onClick={() => navigate({path:"/offer"})}>
          <BookIcon className="ml-16" />
        </div>
        <div onClick={() => navigate({path:"/contact"})}>
          <PencilIcon />
        </div>
        <UserIcon onClick={showSideBar} />
        <SideBar showSideBar={showSideBar} shown={sideBarVisible} />
      </div>
      <div className=" border-b-2"></div>
    </>
  );
}

export default Navbar;
