import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    guiName:string;
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className,guiName, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const moveFocus = () => {

      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    };
    return (
      <div className="relative my-2">
        <textarea
        placeholder=""
          className={cn(
            "flex min-h-[80px] w-full rounded-md uiinput border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={textareaRef}
          {...props}
        />
        <span
          onClick={moveFocus}
          className="font-medium transform transition-transform translate uiinputspan absolute top-4 left-2 "
        >
          {guiName}
        </span>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
