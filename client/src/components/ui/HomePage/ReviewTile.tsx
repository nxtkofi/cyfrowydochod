import { TrustReviewsType } from "@/types";
import { CalendarIcon } from "lucide-react";

type ReviewTileProps = {
  review: TrustReviewsType;
};

function ReviewTile({ review }: ReviewTileProps) {
  return (
    <div className="md:w-96 flex flex-row p-4 text-slate-900 bg-[#FFF] border border-[#E5E7EB] rounded-sm shadow-md my-4">
      <img
        className="bg-black w-10 h-10 rounded-full"
        src={"/avatars/" + review.avatar + ".jpg"}
      />
      <div className="flex flex-col ml-4">
        <p className="text-sm font-semibold">{"@" + review.username}</p>
        <p className="text-sm">{review.text}</p>
        <div className="flex flex-row text-slate-400 mt-2">
          <CalendarIcon size={16} />
          <p className="text-xs ml-1">
            Bought <cite>{review.book}</cite> on {review.purchaseDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewTile;
