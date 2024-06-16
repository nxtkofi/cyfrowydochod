import { FunctionComponent } from "react";
import { CalendarIcon } from "lucide-react";
import { TrustHeaderType, TrustReviewsType } from "@/types";
interface TrustSectionProps {
    trustReviews:TrustReviewsType[];
}
 function TrustHeader({text}:TrustHeaderType) {
    return ( <p className="text-4xl font-semibold text-slate-900">{text}</p> );
 }
 
const TrustSection: FunctionComponent<TrustSectionProps> = ({trustReviews}) => {
    return (<div className="flex flex-col justify-center items-center">
        <TrustHeader text="We can help you"/>
        <TrustHeader text="Remember"/>
        <br/>
        <TrustHeader text="They trusted us"/>
        <div className="mb-12"><TrustHeader text="We delivered"/></div>

        {trustReviews.map((review)=>(
                <div className="w-full flex flex-row p-4 text-slate-900 bg-[#FFF] border border-[#E5E7EB] rounded-sm shadow-md my-4">
                    <img className="bg-black w-10 h-10 rounded-full" src="/LaptopWheel.jpg"/> {/* Image here */}
                    <div className="flex flex-col ml-4"> {/* Content here */}
                        <p className="text-sm font-semibold">{ "@" + review.username}</p>
                        <p className="text-sm">{review.text}</p>
                        <div className="flex flex-row text-slate-400 mt-2">
                        <CalendarIcon size={16}/>
                            <p className="text-xs ml-1">Bought <cite>{review.book}</cite> on {review.purchaseDate}</p>
                        </div>
                    </div>
                </div>
        ))}
        </div>
      );
}
 
export default TrustSection;