
import Menu from "./Menu";

type SideBarProps = {
    shown:boolean;
    showSideBar:()=>void;
}

function SideBar({shown,showSideBar}:SideBarProps) {
    return ( <div className={`fixed w-60 right-0 top-0 bg-white h-full transition-all transform 
    ${shown ? "" : "-right-60"}
    `}>
        <Menu wihtCloseIcon showSideBar={showSideBar}/>
    </div> );
}

export default SideBar;