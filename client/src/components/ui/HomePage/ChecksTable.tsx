import { VerifiedIcon } from "lucide-react";
import { useEffect } from "react";

type ChcecksTableType = {
  features: string[];
  gradient: string;
  textBlack?:boolean;
};

function ChecksTable({ features, gradient,textBlack }: ChcecksTableType) {
    
    useEffect(() => {
        console.log("gradient:",gradient)
    }, []);
  return (
    <div className={`${textBlack ? "text-black" : "text-white"} font-semibold rounded-xl p-2 m-8 flex flex-col`} style={{ background: gradient}}>
      {features.map((feature, index) => (
        <div key={index} className="flex flex-row items-center">
          <VerifiedIcon />
          <p className="text-[12px] ml-1">{feature}</p>
        </div>
      ))}
    </div>
  );
}

export default ChecksTable;
