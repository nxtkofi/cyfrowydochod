import { useEffect, useState } from "react";
import { Button } from "../../button";
import { Input } from "../../input";
import { BillingType } from "@/types";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { useToast } from "../../use-toast";
import Loader from "../../loader";

type BillingFormProps = {
  billing?: BillingType;
  setBilling: React.Dispatch<React.SetStateAction<BillingType | undefined>>;
};
function BillingForm({ setBilling, billing }: BillingFormProps) {
  const { toast } = useToast();
  const { auth } = useAuth();
  const { sendReq, apiLoading } = useApi();
  const [valuesUnchanged, setValuesUnchanged] = useState<boolean>(true);
  const [input, setInput] = useState<BillingType | undefined>(
    billing ? billing : undefined
  );

  const handleChange = (value: string, name: string) => {
    setInput((prev) => {
      if (prev) {
        return { ...prev, [name]: value };
      } else {
        return {
          fullName: "",
          streetName: "",
          houseNumber: "",
          zipCode: "",
          city: "",
          addressId: "",
          [name]: value,
        };
      }
    });
    console.log(input);
  };
  useEffect(() => {
    if (billing && input) {
      if (
        input.addressId !== billing.addressId ||
        input.city !== billing.city ||
        input.fullName !== billing.fullName ||
        input.houseNumber !== billing.houseNumber ||
        input.streetName !== billing.streetName ||
        input.zipCode !== billing.zipCode
      ) {
        setValuesUnchanged(false);
      } else {
        setValuesUnchanged(true);
      }
    }
  }, [input, billing]);
  const updateAddress = async () => {
    toast({ description: "Updating address..." });
    const { response } = await sendReq(
      `api/billingAddresses/${auth?.id}`,
      "PUT",
      input,
      { title: "Success!", description: "Address updated successfully!" },
    );
    if (response?.status === 200) {
      setBilling(input!);
    }
  };

  const postAddress = async () => {
    const { response } = await sendReq(
      `/api/billingAddresses/${auth?.id}`,
      "POST",
      input,
      { title: "Success!", description: "Address added successfully!" },
    );
    if (response?.status === 200) {
      setBilling(input);
    }
  };
  return (
    <>
      <Input
        initValue={billing && input?.fullName}
        validationRules={{
          min: 2,
          max: 30,
          spaceAllowed: true,
          mustContain: {
            bigLetter: false,
            number: false,
            specialChar: false,
          },
        }}
        handleChange={(value: string) => handleChange(value, "fullName")}
        name="fullname"
        className=""
        guiName={"Full name"}
      />
      <Input
        initValue={billing && input?.streetName}
        validationRules={{
          min: 2,
          max: 30,
          spaceAllowed: true,
          mustContain: {
            bigLetter: false,
            number: false,
            specialChar: false,
          },
        }}
        handleChange={(value: string) => handleChange(value, "streetName")}
        name="street"
        className=""
        guiName={"Street"}
      />
      <Input
        initValue={billing && input?.houseNumber.toString()}
        validationRules={{
          min: 0,
          max: 4,
          spaceAllowed: true,
          mustContain: {
            bigLetter: false,
            number: false,
            specialChar: false,
          },
        }}
        handleChange={(value: string) => handleChange(value, "houseNumber")}
        name="housenumber"
        className=""
        guiName={"House/Flat number"}
      />
      <Input
        initValue={billing && input?.zipCode}
        validationRules={{
          min: 3,
          max: 8,
          spaceAllowed: false,
          mustContain: {
            bigLetter: false,
            number: false,
            specialChar: false,
          },
        }}
        handleChange={(value: string) => handleChange(value, "zipCode")}
        name="zipcode"
        className=""
        guiName={"Postal code"}
      />
      <Input
        initValue={billing && input?.city}
        validationRules={{
          min: 2,
          max: 30,
          spaceAllowed: true,
          mustContain: {
            bigLetter: false,
            number: false,
            specialChar: false,
          },
        }}
        handleChange={(value: string) => handleChange(value, "city")}
        name="city"
        className=""
        guiName={"City"}
      />
      {billing?.zipCode ? (
        <Button
          className="w-fit"
          onClick={updateAddress}
          disabled={valuesUnchanged}
        >
          {apiLoading ? <Loader/> :  "Save changes"}
        </Button>
      ) : (
        <Button onClick={postAddress}>
          {apiLoading ? "Loading..." : "Add"}
        </Button>
      )}
    </>
  );
}

export default BillingForm;
