import { IconProps } from "@/types";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { lazy, Suspense } from "react";

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }}/>



function LucideIcon({name,style, ...props}:IconProps) {
    const LucideIcon = lazy(dynamicIconImports[name]);
    return ( <Suspense fallback={fallback}>
        <LucideIcon style={style} {...props}/>
    </Suspense> );
}

export default LucideIcon;