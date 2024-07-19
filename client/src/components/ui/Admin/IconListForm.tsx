import { SetStateAction } from "react";
import { Button } from "../button";
import { Input } from "../input";
import IconList from "./IconList";
import { BookTypeRequest, iconElementsType } from "@/types";
import InfoElement from "@/components/InfoElement";

interface IIconListForm {
  hasErr: boolean;
  setHasErr: React.Dispatch<SetStateAction<boolean>>;
  iconElements: { icon: string; text: string };
  handleAddIconElement: () => void;
  bookIconElementsList: iconElementsType[] | undefined;
  handleInputChange: (arg1: string, arg2: string) => void;
  setInput: React.Dispatch<SetStateAction<BookTypeRequest>>;
}
function IconListForm({
  hasErr,
  setHasErr,
  iconElements,
  handleAddIconElement,
  bookIconElementsList,
  handleInputChange,
  setInput,
}: IIconListForm) {
  return (
    <div className="flex flex-col p-8 bg-[#FBFBFB]">
      <div className="relative">
        <p className="text-xl font-semibold text-center">Add icons</p>
        <InfoElement
        hoverPosition="-right-24"
        className="right-[4.5rem] top-0"
          infoElementDetails={{
            description: "Here you can add some soul to your new book by adding beautiful Lucide Icons and texts to them!",
            title: "Add some icons!",
            imgSrc: "/instructions/iconElements.png",
          }}
        />
      </div>
      <Input
        setParentError={setHasErr}
        guiName="Lucide-icon"
        handleChange={(value) => handleInputChange(value, "icon")}
        value={iconElements.icon}
        validationRules={{
          min: 1,
          max: 30,
          mustBeEmail: false,
          spaceAllowed: false,
          mustContain: {
            specialChar: false,
            number: false,
            bigLetter: false,
          },
          isIcon: true,
        }}
      />

      <Input
        handleChange={(value) => handleInputChange(value, "text")}
        value={iconElements.text}
        guiName="Icon text"
      />
      <Button onClick={handleAddIconElement} disabled={hasErr}>
        Add element
      </Button>
      <IconList
        setInput={setInput}
        bookIconElementsList={bookIconElementsList!}
      />
    </div>
  );
}

export default IconListForm;
