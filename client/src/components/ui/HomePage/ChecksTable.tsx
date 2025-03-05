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
    setInput &&
      setInput((prev) => ({
        ...prev,
        bookFeaturesList: [
          ...prev.bookFeaturesList.filter(
            (feature) => feature !== featureToRemove,
          ),
        ],
      }));
  };
  useEffect(() => {
    console.log("gradient:", gradient);
  }, []);
  return (
    <div
      className={`${
        textBlack ? "text-black" : "text-white"
      } rounded-xl p-2 w-fit self-center flex flex-col gap-y-2`}
      style={{ background: gradient }}
    >
      {features.map((feature, index) => (
        <div key={index} className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <VerifiedIcon className="min-w-5 min-h-5 max-w-5 max-h-5" />
            <p className="text-sm lg:text-base ml-1">{feature}</p>
          </div>
          {forAdmin && (
            <TrashIcon color="black" onClick={() => removeFeature(feature)} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ChecksTable;
