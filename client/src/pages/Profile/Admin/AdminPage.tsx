import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import TicketCard from "@/components/ui/Profile/Support/TicketCard";
import Wrapper from "@/components/ui/wrapper";
import useApi from "@/hooks/useApi";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Book, Plus } from "lucide-react";
import { TicketType } from "@/types";

function AdminPage() {
  const { sendReq } = useApi();
  const [tickets, setTickets] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const getTickets = async () => {
      const { response } = await sendReq("/api/tickets", "GET");
      setTickets((await response!).data);
    };
    getTickets();
  }, []);

  return (
    <Wrapper>
      <ProfileHeader topText="Admin panel" bottomText="Manage your site" />

      <div className="flex space-x-4 mb-8">
        <Button
          onClick={() => navigate("/profile/addbook")}
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Book
        </Button>
        <Button
          onClick={() => navigate("/profile/adminpanel/manage-books")}
          className="flex items-center"
          variant="outline"
        >
          <Book className="w-4 h-4 mr-2" />
          Manage Books
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
      {tickets &&
        tickets.map((ticket: TicketType) => <TicketCard ticket={ticket} />)}
      {!tickets && <p>No open tickets</p>}
    </Wrapper>
  );
}

export default AdminPage;
