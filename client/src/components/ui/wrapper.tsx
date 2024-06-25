import { ReactNode } from "react";

type WrapperProps = {
    children:ReactNode,
    className?:string,
}
function Wrapper({children,className}:WrapperProps ) {
    return ( <div className={`mx-8 my-8 flex flex-col md:mx-[25%] ${className ? className : ""} `}>{children}</div> );
}

export default Wrapper;