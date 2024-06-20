import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    guiName?:string;
    divClassName?:string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, divClassName, guiName, ...props }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const moveFocus = ()=>{      
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
    return (
      <div className={`relative ${divClassName ? divClassName : ""}`}>
        <input
          type={type}
          placeholder=""
          className={cn(
            "transition duration-200 uiinput flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={inputRef}
          {...props}
        />
        <span onClick={moveFocus} className="font-medium transform transition-transform translate uiinputspan absolute top-2 left-2">
          {guiName}
        </span>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
