import Wrapper from "@/components/ui/wrapper";
import { useParams } from "react-router-dom";
import { HeroBooks, TrustReviews } from "@/constants";
import TextDefault from "@/components/ui/HomePage/textDefault";
import HeroBookTile from "@/components/ui/HomePage/HeroBookTile";
import { Button } from "@/components/ui/button";
import ReviewTile from "@/components/ui/HomePage/ReviewTile";
import { ComboBoxResponsive } from "@/components/ui/comboBox";
import { useEffect, useState } from "react";

export type Status = {
  value: string;
  label: string;
};

export const statuses: Status[] = [
  {
    value: "latest",
    label: "Created: Latest to Oldest",
  },
  {
    value: "oldest",
    label: "Created: Oldest to Latest",
  },
  {
    value: "purchaseDateOld",
    label: "Purchase date: Latest to Oldest",
  },
  {
    value: "done",
    label: "Purchase date: Oldest to Latest",
  },  
];

function BookPage() {
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  useEffect(() => {
    console.log(selectedStatus);
  }, [selectedStatus]);
  let { id } = useParams();
  const book = HeroBooks.find((book) => book.bookId == id);
  if (book == undefined) {
    return (
      <Wrapper>
        <TextDefault bigTitle center variant="default">
          Book doesn't exist
        </TextDefault>
      </Wrapper>
    );
  }
  return (
    <>
      <Wrapper>
        <TextDefault variant="default" bigTitle center>
          {book!.title}
        </TextDefault>
        <TextDefault variant="secondary" className="-mt-2" title center>
          {"by " + book!.author}
        </TextDefault>
        <HeroBookTile
          price={book.price}
          bookFeatures={book.bookFeatures}
          gradient={book.gradient}
          imagePath={book.imagePath}
          textBlack={book.checksTableTextBlack}
        />
        <Button
          style={{ background: book.gradient }}
          className="w-fit self-center my-8"
        >
          Buy now
        </Button>
      </Wrapper>
      <div className="p-4 rounded-lg flex flex-col shadow-md bg-[#FBFBFB]">
        <p className="text-xl font-semibold border-b-2 border-b-slate-300 self-center w-fit mb-4  px-4">
          Description
        </p>
        <p>{book.semiLongDescription}</p>
      </div>
      <Wrapper>
        {TrustReviews && (
          <>
            <TextDefault variant={"default"} center className="mt-16" title>
              Read opinions on this eBook
            </TextDefault>
            <ComboBoxResponsive
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
            {TrustReviews.map((review) => (
              <ReviewTile review={review} />
            ))}
          </>
        )}
      </Wrapper>
    </>
  );
}

export default BookPage;
