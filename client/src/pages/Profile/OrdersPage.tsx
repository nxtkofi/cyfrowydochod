import OrderCard from "@/components/ui/Profile/Orders/OrderCard";
import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import Wrapper from "@/components/ui/wrapper";
import { HeroBooks } from "@/constants";

function OrdersPage() {
  return (
    <>
      <Wrapper>
        <ProfileHeader topText={"Orders"} bottomText={"Here are your last orders"}/>
      </Wrapper>
      {HeroBooks && HeroBooks.map((book) => <OrderCard order={book} />)}
      {HeroBooks.length == 0 && <p>You don't have any orders yet.</p>}
    </>
  );
}

export default OrdersPage;
