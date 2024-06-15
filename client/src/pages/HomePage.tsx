import TextDefault from "@/components/ui/HomePage/textDefault";
import Navbar from "@/components/ui/navbar";
import Wrapper from "@/components/ui/wrapper";

function HomePage() {
  return (
    <>
      <Navbar />
      <section>
        <Wrapper className="text-slate-900">
          <p className="text-center font-semibold text-2xl mb-8">
            Have you ever dreamed about online money-making?
          </p>
          <TextDefault variant={"secondary"}>
            While a lot of people wants to make a change - turns out only 15% of
            them makes a decision.
          </TextDefault>
          <TextDefault variant={"default"}>
            With our courses it is easy to start, easy to rise and easy to
            relax.
          </TextDefault>
          <TextDefault variant={"default"}>
            ...or not. Because if you want to keep going you absolutely can. Buy
            one of our eBooks and actually make a decision
          </TextDefault>
        </Wrapper>
      </section>
    </>
  );
}

export default HomePage;
