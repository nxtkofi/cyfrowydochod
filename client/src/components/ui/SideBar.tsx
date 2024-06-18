import Menu from "./Menu";

type SideBarProps = {
  shown: boolean;
  showSideBar: () => void;
};

function SideBar({ shown, showSideBar }: SideBarProps) {
  return (
    <div
      className={`fixed w-60  top-0 bg-white h-full transition-all
        z-50 
        transform 
    ${shown ? " right-0 " : " -right-60 "}
    `}
    >
      <Menu wihtCloseIcon showSideBar={showSideBar} />
    </div>
  );
}

export default SideBar;
