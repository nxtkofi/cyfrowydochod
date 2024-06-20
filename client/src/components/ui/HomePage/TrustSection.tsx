import { FunctionComponent } from "react";
import { TrustHeaderType, TrustReviewsType } from "@/types";
import ReviewTile from "./ReviewTile";
interface TrustSectionProps {
    trustReviews:TrustReviewsType[];
}
 function TrustHeader({text}:TrustHeaderType) {
    return ( <p className="text-4xl font-semibold text-slate-900 leading-[3.5rem]">{text}</p> );
 }
 
const TrustSection: FunctionComponent<TrustSectionProps> = ({trustReviews}) => {
    return (<div className="flex flex-col justify-center items-center">
        <TrustHeader text="We can help you"/>
        <TrustHeader text="Remember"/>
        <br/>
        <TrustHeader text="They trusted us"/>
        <div className="mb-12"><TrustHeader text="We delivered"/></div>

        {trustReviews.map((review, index)=>(
            <ReviewTile review={review}  key={index+review.book+review.username}/>
                
        ))}
        </div>
      );
}
 
export default TrustSection;