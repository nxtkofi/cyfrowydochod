import { BookTypeRequest } from "@/types";
import { TrashIcon, VerifiedIcon } from "lucide-react";
import { SetStateAction, useEffect } from "react";

type ChcecksTableType = {
  features: string[];
  gradient: string;
  textBlack?: boolean;
  forAdmin: boolean;
  setInput?: React.Dispatch<SetStateAction<BookTypeRequest>>;
};

function ChecksTable({
  features,
  gradient,
  textBlack,
  forAdmin,
  setInput,
}: ChcecksTableType) {
  const removeFeature = (featureToRemove: string) => {
    setInput && setInput((prev) => ({
      ...prev,
      bookFeaturesList: [...prev.bookFeaturesList.filter((feature) => feature !== featureToRemove)],
    }));
  };
  useEffect(() => {
    console.log("gradient:", gradient);
  }, []);
  return (
    <div
      className={`${
        textBlack ? "text-black" : "text-white"
      } font-semibold rounded-xl p-2 w-56 self-center flex flex-col`}
      style={{ background: gradient }}
    >
      {features.map((feature, index) => (
        <div key={index} className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <VerifiedIcon />
            <p className="text-[12px] ml-1">{feature}</p>
          </div>
          {forAdmin && (
            <TrashIcon color="black" onClick={()=>removeFeature(feature)} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ChecksTable;
