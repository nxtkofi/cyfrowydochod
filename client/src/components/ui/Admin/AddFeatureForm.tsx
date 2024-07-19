import { BookTypeRequest } from "@/types";
import ChecksTable from "../HomePage/ChecksTable";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { SetStateAction } from "react";
import InfoElement from "@/components/InfoElement";

interface IAddFeatureForm {
  handleAddFeature: () => void;
  handleInputChange: (arg1: string, arg2: string) => void;
  features: string[];
  gradient: string;
  value: string;
  textBlack: boolean;
  setTextBlack: React.Dispatch<SetStateAction<boolean>>;
  setInput: React.Dispatch<SetStateAction<BookTypeRequest>>;
}
function AddFeatureForm({
  setInput,
  handleInputChange,
  handleAddFeature,
  features,
  value,
  gradient,
  setTextBlack,
  textBlack,
}: IAddFeatureForm) {
  return (
    <div className="flex flex-col p-8 bg-[#FBFBFB] mt-2">
      <div className="relative">
        <p className="text-xl font-semibold text-center">Add features</p>
        <InfoElement
          infoElementDetails={{
            description:
              "Add features that your book's gonna show to the world!",
            title: "Features list",
            imgSrc: "/instructions/features.png",
          }}
          hoverPosition="-right-24"
          className="right-16 top-0"
        />
      </div>
      <Input
        value={value}
        handleChange={(value) => handleInputChange(value, "feature")}
        guiName="Feature"
      />
      <Button onClick={handleAddFeature}>Add feature</Button>

      {features.length > 0 && (
        <div className="mt-4 self-center">
          <ChecksTable
            setInput={setInput}
            features={features}
            textBlack={textBlack}
            gradient={gradient}
            forAdmin={true}
          />
          <div className="flex flex-row items-center justify-center">
            <Checkbox
              checked={textBlack}
              onClick={() => {
                setTextBlack((prev) => !prev);
                setInput((prev) => {
                  return {
                    ...prev,
                    newBook: {
                      ...prev.newBook,
                      checksTableTextBlack: !prev.newBook.checksTableTextBlack,
                    },
                  };
                });
              }}
            />
            <p className=" m-2">Set text to black</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddFeatureForm;
