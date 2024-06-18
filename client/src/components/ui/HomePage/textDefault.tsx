type TextDefaultProps = {
  children: string;
  variant: "default" | "secondary";
  className?: string;
  title?: boolean;
  center?:boolean
  bigTitle?:boolean
};

function TextDefault({
  children,
  variant,
  className,
  title,
  center,
  bigTitle
}: TextDefaultProps) {
  return (
    <p
      className={`${center ? "text-center" : ""} my-4 ${
        variant == "default" ? "text-slate-900" : "text-slate-500 mb-4 -my-2"
      } ${className ? className : ""} ${title ? "font-semibold text-2xl" : ""} ${bigTitle ? "font-semibold text-4xl" : ""}`}
    >
      {children}
    </p>
  );
}

export default TextDefault;
