import Wrapper from "@/components/ui/wrapper";
import { useParams } from "react-router-dom";
import { TrustReviews } from "@/constants";
import TextDefault from "@/components/ui/HomePage/TextDefault";
import HeroBookTile from "@/components/ui/HomePage/HeroBookTile";
import ReviewTile from "@/components/ui/HomePage/ReviewTile";
import { ComboBoxResponsive } from "@/components/ui/comboBox";
import { useEffect, useState } from "react";
import useBooks from "@/hooks/useBooks";
import { Status } from "@/types";

//TODO: grab reviews from API

function SingleProductPage() {
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const { books, isLoading, error } = useBooks();
  useEffect(() => {
    console.log(selectedStatus);
  }, [selectedStatus]);
  let { id } = useParams();
  const book = books?.find((book) => book.id == id);
  if (book == undefined) {
    return (
      <Wrapper>
        <TextDefault bigTitle center variant="default">
          Book doesn't exist
        </TextDefault>
      </Wrapper>
    );
  }
  if (isLoading) {
    return (
      <Wrapper>
        <TextDefault bigTitle center variant="default">
          Loading...
        </TextDefault>
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <TextDefault bigTitle center variant="default">
          Error: {error.message}
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
        <HeroBookTile
          bookId={book.id}
          iconElements={book.iconElements}
          description={book.longDescription}
          author={book.author}
          price={book.price}
          bookFeatures={book.bookFeatures}
          gradient={book.gradient}
          imagePath={book.imagePath}
          textBlack={book.checksTableTextBlack}
          isSingleProductPage
        />
      </Wrapper>
      <Wrapper>
        {TrustReviews && (
          <>
            <TextDefault variant={"default"} center className="mt-16" title>
              Ebook reviews
            </TextDefault>
            <ComboBoxResponsive
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />

            <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-x-4">
              {TrustReviews.map((review) => (
                <ReviewTile review={review} />
              ))}
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
}

export default SingleProductPage;
