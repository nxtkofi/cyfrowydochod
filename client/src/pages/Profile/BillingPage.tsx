import CardElement from "@/components/ui/Profile/Billing/CardElement";
import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/ui/wrapper";

function BillingPage() {
  return (
    <>
      <Wrapper className="">
        <ProfileHeader
          topText={"Billing"}
          bottomText={"Review your billing settings"}
        />
        <div className="flex flex-col mt-4">
          <Input
            divClassName="my-4"
            name="email"
            className=""
            guiName={"Email"}
          />
          <Input
            divClassName="my-4"
            name="fullname"
            className=""
            guiName={"Full name"}
          />
          <Input
            divClassName="my-4"
            name="street"
            className=""
            guiName={"Street"}
          />
          <Input
            divClassName="my-4"
            name="housenumber"
            className=""
            guiName={"House/Flat number"}
          />
          <Input
            divClassName="my-4"
            name="zipcode"
            className=""
            guiName={"Postal code"}
          />
          <Input
            divClassName="my-4"
            name="city"
            className=""
            guiName={"City"}
          />
          <Button className="w-fit" disabled>
            Save changes
          </Button>
          <div className="flex justify-center flex-col">
            <CardElement />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default BillingPage;
