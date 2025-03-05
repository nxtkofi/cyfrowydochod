import { ReactNode } from "react";

type TextDefaultProps = {
  children: string | ReactNode;
  variant: "default" | "secondary";
  className?: string;
  title?: boolean;
  center?: boolean;
  bigTitle?: boolean;
};

function TextDefault({
  children,
  variant,
  className,
  title,
  center,
  bigTitle,
}: TextDefaultProps) {
  return (
    <p
      className={`${center ? "text-center " : ""} my-4 ${
        variant == "default"
          ? "text-slate-900 lg:text-lg"
          : "text-slate-500 mb-4 -my-2 lg:text-lg"
      } ${className ? className : ""} ${title ? "font-semibold text-2xl lg:!text-4xl" : ""} ${bigTitle ? "font-semibold text-4xl lg:!text-4xl" : ""}`}
    >
      {children}
    </p>
  );
}

export default TextDefault;
