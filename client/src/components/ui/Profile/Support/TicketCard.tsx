import { MessageType, TicketType } from "@/types";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "../../textarea";
import { Button } from "../../button";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";

type TicketCardProps = {
  ticket: TicketType;
};
function TicketCard({ ticket }: TicketCardProps) {
  const [answer, setAnswer] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>();
  const { sendReq, apiLoading } = useApi();
  const { auth } = useAuth();

  const sendAnswer = async () => {
    const { response, err } = await sendReq(
      `/api/tickets/${ticket.id}`,
      "PUT",
      answer,
      {
        title: "Message sent!",
        description: "Your message was submitted successfully",
      },
    );
    console.log({ response, err });
  };
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  const [creationDate, setCreationDate] = useState<string | null>(null);
  useEffect(() => {
    const date = new Date(ticket.date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    setMessages(
      ticket.messages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      )
    );

    setCreationDate(`${day}.${month}.${year}`);
  }, []);

  return (
    <div className="p-4 mt-4 bg-[#FBFBFB] rounded-sm shadow-md">
      <div className="flex flex-col">
        <div className="flex flex-row items-center my-2">
          <Calendar className="mr-2" size={18} />{" "}
          <p className="font-semibold">Created on {creationDate?.toString()}</p>
        </div>
        <div className="flex flex-row my-2">
          <Clock className="mr-2" size={18} />{" "}
          <p className="font-semibold">Status: {ticket.status}</p>
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
          {messages &&
            messages.map((message) => (
              <div className="my-4">
                <p className="font-semibold">{message.sender}:</p>
                {message.message}
              </div>
            ))}
            
          {messages &&
          auth?.role == "commonUser" &&
          messages.length > 0 &&
          (messages[messages.length - 1].sender == "Admin" ||messages[messages.length - 1].sender == "Support" ) ? (
            <>
              <Textarea
                rows={8}
                className="my-4"
                onChange={handleChange}
                value={answer}
              />
              <Button className="w-fit" onClick={sendAnswer}>
                Send answer
              </Button>
            </>
          ) : (
            <></>
          )}
          {messages &&
          auth?.role == "admin" &&
          messages.length > 0 &&
          messages[messages.length - 1].sender == "User" ? (
            <>
              <Textarea
                rows={8}
                className="my-4"
                onChange={handleChange}
                value={answer}
              />
              <Button className="w-fit" onClick={sendAnswer}>
                Send answer
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
