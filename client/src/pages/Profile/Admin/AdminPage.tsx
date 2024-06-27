import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import TicketCard from "@/components/ui/Profile/Support/TicketCard";
import Wrapper from "@/components/ui/wrapper";
import useApi from "@/hooks/useApi";
import { useState, useEffect } from "react";

function AdminPage() {
  const { sendReq, apiLoading } = useApi();
  const [tickets, setTickets] = useState(undefined);
  useEffect(() => {
    const getTickets = async () => {
      const { response, err } = await sendReq("/api/tickets", "GET");
      setTickets((await response!).data);
    };
    getTickets();
  }, []);
  return (
    <Wrapper>
      <ProfileHeader topText="Admin panel" bottomText="Answer tickets!" />
      {tickets && tickets.map((ticket) => <TicketCard ticket={ticket} />)}
    </Wrapper>
  );
}

export default AdminPage;
