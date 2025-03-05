import { FunctionComponent } from "react";
import { TrustReviewsType } from "@/types";
import ReviewTile from "./ReviewTile";
interface TrustSectionProps {
  trustReviews: TrustReviewsType[];
}

const TrustSection: FunctionComponent<TrustSectionProps> = ({
  trustReviews,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-4xl font-semibold text-slate-900 leading-[3.5rem]">
        Join our community of readers
      </p>

      {trustReviews.map((review, index) => (
        <ReviewTile
          review={review}
          key={index + review.book + review.username}
        />
      ))}
    </div>
  );
};

export default TrustSection;

