import ChecksTable from "./ChecksTable";
import TextDefault from "./textDefault";

type HeroBookTileProps = {
  bookTitle: string;
  price: string;
  author: string;
  bookFeatures: string[];
  gradient:string;
  imagePath:string;
};
function HeroBookTile({ bookTitle, price, author, bookFeatures,gradient,imagePath }:HeroBookTileProps) {
  return (
    <div className="bg-[#FBFBFB] w-80 rounded-2xl shadow-lg flex flex-col p-4">
      <TextDefault variant="default" title center>
        {bookTitle}
      </TextDefault>
      <TextDefault variant="secondary" className={"-my-4 ml-9"} >
       {"by " + author}
      </TextDefault>
      <img
        src={imagePath}
        alt=""
        className="rounded-2xl w-3/4 self-center"
      />
      <TextDefault className={"ml-8 -mb-4"} variant="default" title>
        {price + ",-"}
      </TextDefault>
      <ChecksTable gradient={gradient} features={bookFeatures}/>
    </div>
  );
}

export default HeroBookTile;

