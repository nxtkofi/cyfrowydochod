import { XIcon } from "lucide-react";

type SideBarProps = {
    shown:boolean;
    showSideBar:()=>void;
}

function SideBar({shown,showSideBar}:SideBarProps) {
    return ( <div className={`fixed w-64 right-0 top-0 bg-white h-full transition-all transform
    ${shown ? "" : "-right-64"}
    `}>
        <div className="flex flex-col">
 <XIcon onClick={showSideBar} className="m-8 self-end"/> asuohfgaiusft8asga
 </div>
    </div> );
}

export default SideBar;