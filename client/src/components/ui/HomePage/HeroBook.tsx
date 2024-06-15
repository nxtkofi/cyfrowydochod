import { HeroBookType } from "@/types";
import HeroBookTile from "./HeroBookTile";
import TextDefault from "./textDefault";
import { Button } from "../button";

type HeroBookProps = {
  book: HeroBookType;
};
function HeroBook({ book }: HeroBookProps) {
  return (
    <>
      <TextDefault title variant="default" center>
        {book.title}
      </TextDefault>
      <TextDefault variant="secondary" center>
        {book.subTitle}
      </TextDefault>
      <TextDefault variant="default" center>
        {book.firstText}
      </TextDefault>
      <TextDefault variant="default" center>
        {book.secondText}
      </TextDefault>
      {book.iconElements &&
        book.iconElements.map((element) => (
          <div className="flex flex-col">
            <div className="flex flex-row">
              {element.icon}
              <p>{element.text}</p>
            </div>
          </div>
        ))}
      <HeroBookTile
        imagePath={book.imagePath}
        bookTitle={book.title}
        price={book.price}
        author={book.author}
        bookFeatures={book.bookFeatures}
        gradient={book.gradient}
      />
      <Button
        style={{ background: book.gradient }}
        className="self-center my-4"
      >
        Buy now!
      </Button>
    </>
  );
}

export default HeroBook;
