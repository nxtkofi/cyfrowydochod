import HeroBook from "@/components/ui/HomePage/HeroBook";
import TextDefault from "@/components/ui/HomePage/textDefault";
import Navbar from "@/components/ui/navbar";
import Wrapper from "@/components/ui/wrapper";
import { HeroBooks } from "@/constants";

function HomePage() {
  return (
    <>
      <Navbar />
      <section>
        <Wrapper className="text-slate-900">
          <TextDefault variant="default" title center>
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
          <img src="public/EmojiBundle.jpg" className="w-2/3 self-center rounded-xl" alt="" />
        </Wrapper>
      </section>
      <section>
        <Wrapper>
          {HeroBooks.map((Book, index)=><HeroBook key={index} book={Book}/>)}
        </Wrapper>
      </section>
    </>
  );
}

export default HomePage;
