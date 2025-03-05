import Wrapper from "@/components/ui/wrapper";
import useNavigation from "@/hooks/useNavigation";

function ErrorPage() {
  const navigate = useNavigation();

  return (
    <Wrapper className="h-screen">
      <p className="text-4xl text-center font-semibold mt-24 leading-[60px]">
        Hey, You!
        <br /> You're lost! Go back to&nbsp;
        <i
          onClick={() => navigate({ path: "/" })}
          className="md:hover:underline md:no-underline underline cursor-pointer"
        >
          Home page!
        </i>
      </p>
    </Wrapper>
  );
}

export default ErrorPage;
