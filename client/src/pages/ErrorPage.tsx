import Wrapper from "@/components/ui/wrapper";

function ErrorPage() {

    return ( <Wrapper className="h-screen"><p className="text-4xl text-center font-semibold mt-24 leading-[60px]">Hey! You! You're lost! Go back to <a href="/" className="md:hover:underline md:no-underline underline italic">HomePage!</a></p> </Wrapper>);
}

export default ErrorPage;