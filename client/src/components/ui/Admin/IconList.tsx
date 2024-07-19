import React, { SetStateAction } from "react";
import LucideIcon from "../HomePage/LucideIcon";
import { BookTypeRequest, iconElementsType } from "@/types";
import { XIcon } from "lucide-react";

interface IconListProps {
  bookIconElementsList: iconElementsType[];
  setInput: React.Dispatch<SetStateAction<BookTypeRequest>>;
}
const IconList = React.memo<IconListProps>(
  ({ bookIconElementsList, setInput }) => {
    const handleRemoveIconElement = (
      elementProp: iconElementsType,
      indexProp: number
    ) => {
      setInput((prev) => {
        return {
          ...prev,
          bookIconElementsList: [
            ...prev.bookIconElementsList.filter((element, index) => {
              return (elementProp && indexProp) !== (element && index);
            }),
          ],
        };
      });
    };

    return (
      <>
        {bookIconElementsList &&
          bookIconElementsList.map((element, index) => (
            <div
              key={index}
              className="bg-white rounded-sm p-2 flex flex-row shadow-lg items-center my-2 justify-between"
            >
              <div className="flex flex-row items-center">
                <LucideIcon name={element.icon} />{" "}
                <p className="ml-2 text-sm">{element.text}</p>
              </div>
              <XIcon onClick={() => handleRemoveIconElement(element, index)} />
            </div>
          ))}
      </>
    );
  }
);
export default IconList;
