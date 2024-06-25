import BillingForm from "@/components/ui/Profile/Billing/BillingForm";
import CardElement from "@/components/ui/Profile/Billing/CardElement";
import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import Wrapper from "@/components/ui/wrapper";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { BillingType } from "@/types";
import { useEffect, useState } from "react";

function BillingPage() {
  const { sendReq, apiLoading } = useApi();
  const [billing, setBilling] = useState<BillingType | undefined>(undefined);

  const { auth } = useAuth();

  useEffect(() => {
    const getBilling = async () => {
      const { response } = await sendReq(
        `/api/billingAddresses/${auth?.id}`,
        "GET",
      );
      setBilling(await response!.data);
    };
    getBilling();
  }, []);
  
  return (
    <>
      <Wrapper className="">
        <ProfileHeader
          topText={"Billing"}
          bottomText={"Review your billing settings"}
        />
        <div className="flex flex-col mt-4">
        {apiLoading===false && <BillingForm setBilling={setBilling} billing={billing} />}
          <div className="flex justify-center flex-col">
            <CardElement />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default BillingPage;
