import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
  className?: string;
};
function Wrapper({ children, className }: WrapperProps) {
  return (
    <section>
      <div
        className={`self-center mx-4 my-8 flex flex-col max-w-[740px] lg:max-w-[840px] xl:max-w-[1080px] 2xl:max-w-[1180px]  ${className ? className : ""} `}
      >
        {children}
      </div>
    </section>
  );
}

export default Wrapper;
