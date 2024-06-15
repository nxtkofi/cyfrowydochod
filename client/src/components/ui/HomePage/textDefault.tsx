type TextDefaultProps = {
  children: String;
  variant: "default" | "secondary";
};

function TextDefault({ children, variant }: TextDefaultProps) {
  return (
    <p
      className={`text-center my-4 ${
        variant == "default" ? "text-slate-900" : "text-slate-500"
      }`}
    >
      {children}
    </p>
  );
}

export default TextDefault;
