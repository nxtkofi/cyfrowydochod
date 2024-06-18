import { TicketType } from "@/types";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { Button } from "../../button";

type TicketCardProps = {
  ticket: TicketType;
};
function TicketCard({ ticket }: TicketCardProps) {
  const [creationDate, setCreationDate] = useState<string | null>(null);

  useEffect(() => {
    const date = new Date(ticket.creationDate * 1000); 
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();

    setCreationDate(`${day}.${month}.${year}`);
  }, []);

  return (
    <div className="p-4 mt-4 bg-[#FBFBFB] rounded-sm shadow-md">
      <div className="flex flex-col">
        <div className="flex flex-row items-center my-2">
          <Calendar className="mr-2" size={18} /> <p className="font-semibold">Created on {creationDate?.toString()}</p>
        </div>
        <div className="flex flex-row my-2">
          <Clock className="mr-2" size={18} /> <p className="font-semibold">Status: {ticket.status}</p>
        </div>
        <div className="flex flex-row my-2">
          <p className="font-semibold mr-2">Subject:</p> <p>{ticket.subject}</p>
        </div>
        <div className="flex flex-row my-2">
          <p className="font-semibold mr-2 ">Order id:</p>{" "}
          <p>{ticket.orderId}</p>
        </div>
        <div className="flex flex-col my-2">
          <p className="font-semibold mr-2">Messages:</p>{" "}
          {ticket.messages.map((message) => (
            <div className="my-4"><p className="font-semibold">{message.sender}:</p>{message.message}</div>
          ))}
          {ticket.messages[ticket.messages.length-1].sender=="Support" && <><Textarea rows={8} className="my-4"/> <Button className="w-fit">Send answer</Button></>}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
