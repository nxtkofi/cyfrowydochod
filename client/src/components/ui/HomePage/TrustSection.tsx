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
    <div className="flex flex-col justify-center items-center max-w-screen">
      <p className="text-4xl font-semibold text-slate-900 leading-[3.5rem] w-screen text-center p-2 text-wrap">
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
            <div className="mx-8">
              <ReviewTile
                review={review}
                key={index + review.book + review.username}
              />
            </div>
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  );
};

export default TrustSection;
