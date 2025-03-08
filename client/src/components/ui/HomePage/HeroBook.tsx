import { BookType } from "@/types";
import HeroBookTile from "./HeroBookTile";
import TextDefault from "./TextDefault";
import LucideIcon from "./LucideIcon";
import { useEffect } from "react";
import { Button } from "../button";
import { IconElements } from "@/components/IconElements";

type HeroBookProps = {
  book: BookType;
};
function HeroBook({ book }: HeroBookProps) {
  useEffect(() => {
    console.log(book);
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row self-center justify-center md:max-w-[720px] lg:max-w-[820px] xl:max-w-[1080px] md:gap-x-16">
        <div className="flex flex-col items-center justify-center md:items-start ">
          <TextDefault
            className="md:text-left mb-0 lg:mb-4"
            title
            variant="default"
            center
          >
            {book.title}
          </TextDefault>
          <TextDefault className="md:text-left" variant="secondary" center>
            {book.subTitle}
          </TextDefault>
          <TextDefault className="md:text-left mb-0" variant="default" center>
            {book.firstText}
          </TextDefault>
          <TextDefault className="md:text-left" variant="default" center>
            {book.secondText}
          </TextDefault>
          <IconElements iconElements={book.iconElements} bookId={book.id} />
        </div>
        <div className="flex flex-col">
          <HeroBookTile
            imagePath={book.imagePath}
            bookTitle={book.title}
            price={book.price}
            author={book.author}
            bookFeatures={book.bookFeatures}
            gradient={book.gradient}
            textBlack={book.checksTableTextBlack}
          />

          <Button
            style={{ background: book.gradient }}
            className="self-center my-4 relative overflow-hidden px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 before:absolute before:inset-0 before:bg-white/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 hover:shadow-lg hover:scale-105"
          >
            Buy now!
          </Button>
        </div>
      </div>
    </>
  );
}

export default HeroBook;
