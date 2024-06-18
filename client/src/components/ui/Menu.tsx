import { MenuOptions } from "@/constants";
import { FunctionComponent } from "react";
import LucideIcon from "./HomePage/LucideIcon";
import { XIcon } from "lucide-react";

interface MenuProps {
  wihtCloseIcon: boolean;
  showSideBar: () => void;
}

const Menu: FunctionComponent<MenuProps> = ({ wihtCloseIcon, showSideBar }) => {
  return (
    <div className="flex flex-col m-4">
      <div className="flex flex-row justify-between border-b-2 p-4">
        <p className="font-bold text-lg">My Account</p>
        {wihtCloseIcon && <XIcon onClick={showSideBar} className=" self-end" />}
      </div>
      {MenuOptions.map((option, index) => (
        <div key={index}>
          {index % 3 === 0 && index !== 0 && (
            <div className="border-b-2 border-slate-200"></div>
          )}
          <a href={option.path} className="m-3 flex flex-row items-center">
            <LucideIcon name={option.iconName} size={20} />
            <p className="ml-2">{option.optionName}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Menu;
