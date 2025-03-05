import { FunctionComponent } from "react";
import Slider from "react-infinite-logo-slider";
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
      <Slider
        width="440px"
        duration={60}
        pauseOnHover={true}
        blurBorders={true}
      >
        {trustReviews.map((review, index) => (
          <Slider.Slide key={index}>
            <ReviewTile
              review={review}

              key={index + review.book + review.username}
            />
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  );
};

export default TrustSection;

