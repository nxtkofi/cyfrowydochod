import CardElement from "@/components/ui/Profile/Billing/CardElement";
import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/ui/wrapper";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useNavigation from "@/hooks/useNavigation";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function BillingPage() {
  const [input, setInput] = useState({});
  const location = useLocation();
  const navigate = useNavigation();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const handleChange = (value:string, name:string) => {
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    const getBilling = async () => {
      try {
        const res = axiosPrivate.get(`/api/billingAddresses/${auth?.id}`);
        console.log((await res).data);
      } catch (error) {
        console.log(error);
        navigate({ path: "/access", state: { from: location }, replace: true });
      }
    };
    getBilling();
  }, []);
  const postAddress = async () => {
    try {
      const res = axiosPrivate.post(`/api/billingAddresses/${auth?.id}`);
      console.log((await res).data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Wrapper className="">
        <ProfileHeader
          topText={"Billing"}
          bottomText={"Review your billing settings"}
        />
        <div className="flex flex-col mt-4">
          <Input
            preset="email"
            handleChange={(value: string) => handleChange(value, "email")}
            divClassName="my-4"
            name="email"
            className=""
            guiName={"Email"}
            isLoading={false}
          />
          <Input
            validationRules={{
              min: 2,
              max: 30,
              spaceAllowed: true,
              mustContain: {
                bigLetter: true,
                number: false,
                specialChar: false,
              },
            }}
            isLoading={false}
            handleChange={(value: string) => handleChange(value, "fullname")}
            divClassName="my-4"
            name="fullname"
            className=""
            guiName={"Full name"}
          />
          <Input
            validationRules={{
              min: 2,
              max: 30,
              spaceAllowed: true,
              mustContain: {
                bigLetter: true,
                number: false,
                specialChar: false,
              },
            }}
            isLoading={false}
            handleChange={(value: string) => handleChange(value, "street")}
            divClassName="my-4"
            name="street"
            className=""
            guiName={"Street"}
          />
          <Input
            validationRules={{
              min: 2,
              max: 30,
              spaceAllowed: true,
              mustContain: {
                bigLetter: true,
                number: false,
                specialChar: false,
              },
            }}
            isLoading={false}
            handleChange={(value: string) => handleChange(value, "houseNumber")}
            divClassName="my-4"
            name="housenumber"
            className=""
            guiName={"House/Flat number"}
          />
          <Input
            validationRules={{
              min: 2,
              max: 30,
              spaceAllowed: true,
              mustContain: {
                bigLetter: true,
                number: false,
                specialChar: false,
              },
            }}
            isLoading={false}
            handleChange={(value: string) => handleChange(value, "postalCode")}
            divClassName="my-4"
            name="zipcode"
            className=""
            guiName={"Postal code"}
          />
          <Input
            validationRules={{
              min: 2,
              max: 30,
              spaceAllowed: true,
              mustContain: {
                bigLetter: true,
                number: false,
                specialChar: false,
              },
            }}
            isLoading={false}
            handleChange={(value: string) => handleChange(value, "city")}
            divClassName="my-4"
            name="city"
            className=""
            guiName={"City"}
          />
          <Button className="w-fit" onClick={postAddress}>
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
