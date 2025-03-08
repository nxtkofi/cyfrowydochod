import { iconElementsType } from "@/types";
import { Button } from "../button";
import ChecksTable from "./ChecksTable";
import TextDefault from "./TextDefault";
import { Icon } from "lucide-react";
import { IconElements } from "@/components/IconElements";

type HeroBookTileProps = {
  bookTitle?: string;
  price: number;
  author?: string;
  bookFeatures: string[];
  gradient: string;
  imagePath: string;
  description?: string;
  textBlack?: boolean;
  isSingleProductPage?: boolean;
  iconElements?: iconElementsType[];
  bookId?: string | undefined;
};
function HeroBookTile({
  description,
  bookTitle,
  price,
  author,
  bookFeatures,
  gradient,
  imagePath,
  textBlack,
  iconElements,
  isSingleProductPage,
  bookId,
}: HeroBookTileProps) {
  return (
    <div
      className={`flex flex-col self-center ${!isSingleProductPage && "p-8 shadow-lg bg-[#FBFBFB] rounded-2xl w-72 lg:w-[360px] mt-4"}`}
    >
      <TextDefault
        variant="default"
        title
        center
        className={`${isSingleProductPage ? "my-0 -mb-8" : "mt-0"}`}
      >
        {bookTitle}
      </TextDefault>
      {author && isSingleProductPage && (
        <TextDefault variant="secondary" className="text-center md:mb-8 ">
          {`by @${author}`}
        </TextDefault>
      )}
      <div
        className={`${isSingleProductPage ? "flex md:flex-row-reverse flex-col" : ""}`}
      >
        <div className={`flex flex-col ${isSingleProductPage && "md:w-1/2"}`}>
          <img
            src={imagePath}
            className="rounded-2xl self-center w-56 md:w-[22.5rem] lg:w-[30rem]"
          />
          {isSingleProductPage && (
            <div className="flex flex-row-reverse justify-between items-center w-full md:w-[24rem] lg:w-[26rem] place-self-center px-4 lg:px-0">
              <Button
                style={{ background: gradient }}
                className="w-fit self-center my-8 text-base"
              >
                Add to cart
              </Button>
              <TextDefault
                className={"font-semibold md:!text-3xl text-2xl"}
                variant="default"
              >
                {price + "$,-"}
              </TextDefault>
            </div>
          )}
        </div>
        {!isSingleProductPage && (
          <div className="flex flex-row justify-between items-center">
            <TextDefault
              className={"font-semibold !text-2xl"}
              variant="default"
            >
              {price + "$,-"}
            </TextDefault>

            {author && !isSingleProductPage && (
              <TextDefault variant="secondary" className="text-right mr-1">
                {`by @${author}`}
              </TextDefault>
            )}
          </div>
        )}
        <div
          className={`flex flex-col ${isSingleProductPage && "md:w-1/2 place-items-start"}`}
        >
          {description && iconElements && isSingleProductPage && (
            <>
              <TextDefault
                title
                variant="default"
                className="mt-4 self-center md:self-start mb-0 md:mb-4 px-4 lg:px-0"
              >
                Description
              </TextDefault>
              <TextDefault variant="default" className="px-4 lg:px-0 mb-8 mt-2">
                {description}
              </TextDefault>
              <TextDefault
                title
                variant="default"
                className="mt-4 self-center md:self-start mb-0 md:mb-4 px-4 lg:px-0"
              >
                What to expect?
              </TextDefault>
              {iconElements && bookId && (
                <div className="pl-4 lg:pl-0 mb-8">
                  <IconElements iconElements={iconElements} bookId={bookId} />
                </div>
              )}
              <TextDefault
                title
                variant="default"
                className="mt-4 self-center md:self-start mb-0 md:mb-4 px-4 lg:px-0"
              >
                Key features
              </TextDefault>
            </>
          )}

          <div className={`${isSingleProductPage && "pl-4 lg:pl-0"}`}>
            <ChecksTable
              gradient={isSingleProductPage ? "" : gradient}
              features={bookFeatures}
              textBlack={textBlack}
              forAdmin={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBookTile;
