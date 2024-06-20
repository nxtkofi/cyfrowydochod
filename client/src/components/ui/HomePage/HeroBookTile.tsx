import ChecksTable from "./ChecksTable";
import TextDefault from "./textDefault";

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
    <div className="self-center bg-[#FBFBFB] rounded-2xl shadow-lg flex flex-col p-8 mt-4 w-fit">
      {bookTitle && (
        <TextDefault variant="default" title center className="mt-0">
          {bookTitle}
        </TextDefault>
      )}
      {author && (
        <TextDefault variant="secondary" className={"ml-1 -mt-3"}>
          {"by " + author}
        </TextDefault>
      )}
      <img src={imagePath} alt="" className="rounded-2xl w-56 self-center" />
      <TextDefault className={""} variant="default" title>
        {price + "$,-"}
      </TextDefault>
      <ChecksTable
        gradient={gradient}
        features={bookFeatures}
        textBlack={textBlack}
      />
    </div>
  );
}

export default HeroBookTile;
