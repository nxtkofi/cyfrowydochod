import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import TicketCard from "@/components/ui/Profile/Support/TicketCard";
import Wrapper from "@/components/ui/wrapper";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { TicketType } from "@/types";
import { useEffect, useState } from "react";

function SupportPage() {
  const { sendReq, apiLoading } = useApi();
  const { auth } = useAuth();
  const [tickets, setTickets] = useState<TicketType[]>();

  useEffect(() => {
    const getTickets = async () => {
      const { response, err } = await sendReq(
        `/api/tickets/findByUser/${auth?.id}`,
        "GET"
      );
      console.log(response);
      setTickets((await response!).data);
    };
    getTickets();
  }, []);
  return (
    <Wrapper>
      <ProfileHeader
        topText={"Support"}
        bottomText={"View/manage your tickets"}
      />
      {tickets && tickets.map((ticket) => <TicketCard ticket={ticket} />)}
    </Wrapper>
  );
}

export default SupportPage;
