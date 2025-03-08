import { iconElementsType } from "@/types";
import { type ReactElement } from "react";
import LucideIcon from "./ui/HomePage/LucideIcon";

export interface IconElementsProps {
  iconElements: iconElementsType[] | undefined;
  bookId: string;
}

export function IconElements(props: IconElementsProps): ReactElement {
  return (
    <>
      {props.iconElements &&
        props.iconElements.map((element, index) => (
          <div
            key={index + element.icon}
            className="flex flex-col py-[2px] self-center md:self-baseline lg:text-lg"
          >
            <div className="flex flex-row">
              <LucideIcon
                className="mr-2"
                style={{ stroke: `url(#gradient-${props.bookId})` }}
                name={element.icon}
              />
              <p>{element.text}</p>
            </div>
          </div>
        ))}
    </>
  );
}
