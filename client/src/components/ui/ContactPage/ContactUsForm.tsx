import { ChangeEvent, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { MessageType, TicketType } from "@/types";

type ContactUsFormProps = {
  accessDisabled: boolean;
};

type sendingTicketType = {
  email: string;
  subject: string;
  message: string;
  orderId?: string;
};

function ContactUsForm({ accessDisabled }: ContactUsFormProps) {
  const [ticket, setTicket] = useState<sendingTicketType>({
    email: "",
    subject: "",
    orderId: "",
    message: "",
  });
  const axios = useAxiosPrivate();
  const submitTicket = async () => {
    try {
      await axios.post("/api/tickets", ticket);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const value = event.target.value;
    setTicket((prev) => {
      return { ...prev, [name]: value };
    });

    console.log(ticket);
  };
  return (
    <div>
      <Input
        onChange={(e) => handleChange(e, "subject")}
        value={ticket?.subject}
        className="my-8"
        guiName="Subject*"
        required
        disabled={accessDisabled}
      />
      <Input
        onChange={(e) => handleChange(e, "orderId")}
        value={ticket?.orderId}
        className=" my-8"
        guiName="OrderId (not required)"
        disabled={accessDisabled}
      />
      <Textarea
        onChange={(e) => handleChange(e, "message")}
        value={ticket?.message}
        className="my-4"
        rows={8}
        placeholder="Please type your message here."
        required
        disabled={accessDisabled}
      />
      <Input
        onChange={(e) => handleChange(e, "email")}
        value={ticket?.email}
        name="email"
        className="my-8"
        guiName="Email*"
        required
        disabled={accessDisabled}
      />
      <div className="flex">
        <Button
          className="ml-auto"
          onClick={submitTicket}
          disabled={accessDisabled}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default ContactUsForm;
