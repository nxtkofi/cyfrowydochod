import { HomeIcon, BookIcon, PencilIcon, UserIcon } from "lucide-react";

function Navbar() {
  return (
    <>
      {" "}
      <div className="flex flex-row justify-between m-8">
        <HomeIcon />
        <BookIcon className="ml-16" />
        <PencilIcon /> <UserIcon />
      </div>
      <div className=" border-b-2"></div>
    </>
  );
}

export default Navbar;
