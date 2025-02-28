import { MenuOptions } from "@/constants";
import { FunctionComponent } from "react";
import LucideIcon from "./HomePage/LucideIcon";
import { XIcon } from "lucide-react";
import useNavigation from "@/hooks/useNavigation";
import useAuth from "@/hooks/useAuth";

interface MenuProps {
  withCloseIcon: boolean;
  showSideBar: () => void;
}

const Menu: FunctionComponent<MenuProps> = ({ withCloseIcon, showSideBar }) => {
  const { auth } = useAuth();
  const navigate = useNavigation();
  const handleMenuItemClick = (path: string) => {
    showSideBar();
    navigate({ path: path });
  };
  return (
    <div className="flex flex-col m-4">
      <div className="flex flex-row justify-between border-b-2 p-4">
        <p className="font-bold text-lg cursor-none">My Account</p>
        {withCloseIcon && (
          <XIcon onClick={showSideBar} className="cursor-pointer self-end" />
        )}
      </div>
      {MenuOptions.map(
        (option, index) =>
          option.access.includes(auth?.role!) && (
            <div key={index}>
              {index % 3 === 0 && index !== 0 && (
                <div className="border-b-2 border-slate-200"></div>
              )}
              <div
                onClick={() => handleMenuItemClick(option.path)}
                className="m-3 flex flex-row items-center cursor-pointer"
              >
                <LucideIcon name={option.iconName} size={20} />
                <p className="ml-2">{option.optionName}</p>
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default Menu;
