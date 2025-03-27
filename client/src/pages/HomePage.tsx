import HeroBook from "@/components/ui/HomePage/HeroBook";
import TextDefault from "@/components/ui/HomePage/TextDefault";
import TrustSection from "@/components/ui/HomePage/TrustSection";
import Wrapper from "@/components/ui/wrapper";
import { TrustReviews } from "@/constants";
import useBooks from "@/hooks/useBooks";

function HomePage() {
  const { books } = useBooks();

  return (
    <>
      <section>
        <Wrapper className="text-slate-900">
          <div className="flex w-full flex-col lg:flex-row lg:justify-between justify-center items-center  xl:max-w-[1080px] self-center ">
            <div className="flex flex-col lg:w-1/2 text-center lg:text-left px-4 md:px-0">
              <TextDefault
                variant="default"
                bigTitle
                className="leading-[3.5rem]"
              >
                Have you ever dreamed about online money-making?
              </TextDefault>
              <TextDefault variant={"secondary"}>
                While a lot of people wants to make a change - turns out only
                15% of them makes a decision.
              </TextDefault>
              <TextDefault variant={"default"}>
                With our courses it is easy to start, easy to rise and easy to
                relax.
              </TextDefault>
              <TextDefault variant={"default"}>
                ...or not. Because if you want to keep going you absolutely can.
                Buy one of our eBooks and actually make a decision!
              </TextDefault>
            </div>
            <img
              src="/Emojibundle.jpg"
              className="lg:w-1/2 self-center rounded-xl max-w-[400px]"
              alt=""
            />
          </div>
        </Wrapper>
      </section>
      <Wrapper>
        {books &&
          books.map(
            (book, index) =>
              book.isHeroBook && (
                <section key={index}>
                  <HeroBook book={book} />
                </section>
              ),
          )}
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
