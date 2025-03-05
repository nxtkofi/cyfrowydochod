import ChecksTable from "./ChecksTable";
import TextDefault from "./TextDefault";

type HeroBookTileProps = {
  bookTitle?: string;
  price: number;
  author?: string;
  bookFeatures: string[];
  gradient: string;
  imagePath: string;
  textBlack?: boolean;
};
function HeroBookTile({
  bookTitle,
  price,
  author,
  bookFeatures,
  gradient,
  imagePath,
  textBlack,
}: HeroBookTileProps) {
  return (
    <div className="self-center bg-[#FBFBFB] rounded-2xl shadow-lg flex flex-col p-8 mt-4 w-72 lg:w-[360px]">
      <TextDefault variant="default" title center className="mt-0">
        {bookTitle}
      </TextDefault>

      <img
        src={imagePath}
        className="rounded-2xl self-center w-56 lg:w-[720px]"
      />
      <div className="flex flex-row justify-between">
        <TextDefault className={"font-semibold !text-2xl"} variant="default">
          {price + "$,-"}
        </TextDefault>
        {author && (
          <TextDefault variant="secondary" className="text-right mr-1">
            {`by @${author}`}
          </TextDefault>
        )}
      </div>
      <ChecksTable
        gradient={gradient}
        features={bookFeatures}
        textBlack={textBlack}
        forAdmin={false}
      />
    </div>
  );
}

export default HeroBookTile;
