import TextDefault from "@/components/ui/HomePage/textDefault";
import SearchBar from "@/components/ui/OfferPage/SearchBar";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/ui/wrapper";
import { HeroBooks } from "@/constants";
import useNavigation from "@/hooks/useNavigation";
function OfferPage() {
  const navigate = useNavigation()
  const handleNavigate = (path:string)=>{
    navigate({path:path})
  }
  return (
    <>
      <Wrapper className="flex flex-col">
        <TextDefault className="text-center" variant={"default"} bigTitle>
          Explore our offer
        </TextDefault>
        <SearchBar className="mb-4"/>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {HeroBooks.map((book) => (
            <div className="flex flex-col">
              <div className="bg-[#FBFBFB] rounded-md shadow-md p-4 my-4">
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <p className="text-base font-semibold mb-2">{book.title}</p>
                    <p>{book.shortDescription}</p>
                  </div>
                  <div className="flex flex-col min-w-28 mx-2">
                    <img
                      src={book.imagePath}
                      alt=""
                      className="w-28 rounded-lg"
                    />
                    <Button onClick={()=>handleNavigate(`/offer/book/${book.bookId}`)} size={"sm"} className=" self-center w-fit mt-4">
                      More info
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <p className="text-3xl font-semibold">{book.price}$,-</p>{" "}
                <TextDefault className="ml-2  font-medium text-lg" variant="secondary">Tax included</TextDefault>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </>
  );
}

export default OfferPage;
