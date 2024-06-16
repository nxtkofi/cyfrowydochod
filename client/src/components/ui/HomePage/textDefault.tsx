type TextDefaultProps = {
  children: String;
  variant: "default" | "secondary";
  className?: String;
  title?: boolean;
  center?:boolean
};

function TextDefault({
  children,
  variant,
  className,
  title,
  center,
}: TextDefaultProps) {
  return (
    <p
      className={`${center ? "text-center" : ""} my-4 ${
        variant == "default" ? "text-slate-900" : "text-slate-500 mb-4 -my-2"
      } ${className ? className : ""} ${title ? "font-semibold text-2xl" : ""}`}
    >
      {children}
    </p>
  );
}

export default TextDefault;
