import HeroBook from "@/components/ui/HomePage/HeroBook";
import TextDefault from "@/components/ui/HomePage/textDefault";
import TrustSection from "@/components/ui/HomePage/TrustSection";
import Wrapper from "@/components/ui/wrapper";
import { TrustReviews } from "@/constants";
import useBooksContext from "@/hooks/useBooksContext";

function HomePage() {
  const { books } = useBooksContext();

  return (
    <>
      <section>
        <Wrapper className="text-slate-900">
          <TextDefault
            variant="default"
            bigTitle
            center
            className="leading-[3.5rem]"
          >
            Have you ever dreamed about online money-making?
          </TextDefault>
          <TextDefault variant={"secondary"} center>
            While a lot of people wants to make a change - turns out only 15% of
            them makes a decision.
          </TextDefault>
          <TextDefault variant={"default"} center>
            With our courses it is easy to start, easy to rise and easy to
            relax.
          </TextDefault>
          <TextDefault variant={"default"} center>
            ...or not. Because if you want to keep going you absolutely can. Buy
            one of our eBooks and actually make a decision!
          </TextDefault>
          <img
            src="/Emojibundle.jpg"
            className="w-2/3 self-center rounded-xl"
            alt=""
          />
        </Wrapper>
      </section>
      <Wrapper className="xl:flex xl:flex-row xl:items-center xl:justify-between gap-x-8">
        {books &&
          books.map((Book, index) => (
            <section key={index}>
              <HeroBook book={Book} />
            </section>
          ))}
      </Wrapper>
      <section>
        <Wrapper>
          <TrustSection trustReviews={TrustReviews} />
        </Wrapper>
      </section>
    </>
  );
}

export default HomePage;
