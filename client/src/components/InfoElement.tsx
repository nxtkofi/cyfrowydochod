import { infoElementDetailsType } from "@/types";
import { InfoIcon } from "lucide-react";
import { useState } from "react";


type InfoElementProps = {
  infoElementDetails:infoElementDetailsType;
  className:string
  hoverPosition?:string
};

function InfoElement({ infoElementDetails,className,hoverPosition }:InfoElementProps) {
  const [showHoverCard, setShowHoverCard] = useState<boolean>();
  const handleHoverCard = () => {
    setShowHoverCard((prev) => !prev);
  };
  return (
    <div className={`bg-white absolute ${className ? className : ""}`} onClick={handleHoverCard}>
      <InfoIcon className=" text-slate-400" />
      {showHoverCard && (
        <div className={`absolute z-10 bg-white rounded-md border-slate-200 border p-4 w-96 ${hoverPosition ? hoverPosition : "right-0"} flex flex-row`}>
          {infoElementDetails.imgSrc && (
            <img src={infoElementDetails.imgSrc} className="w-2/3" alt="" />
          )}
          <div className="flex flex-col">
            <p className="font-semibold">{infoElementDetails?.title}</p>
            <p className="text-sm w-fit">{infoElementDetails?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoElement;
