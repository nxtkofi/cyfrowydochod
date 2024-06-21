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

  const handleChange =
    (name: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setTicket((prev) => {
        return { ...prev, [name]: value };
      });
    };

  return (
    <div>
      <Input
        onChange={handleChange("subject")}
        value={ticket?.subject}
        className="my-8"
        guiName="Subject*"
        required
        accessDisabled={accessDisabled}
      />
      <Input
        onChange={handleChange("orderId")}
        value={ticket?.orderId}
        className=" my-8"
        guiName="OrderId (not required)"
        accessDisabled={accessDisabled}
      />
      <Textarea
        onChange={handleChange("message")}
        value={ticket?.message}
        className="my-4"
        rows={8}
        placeholder="Please type your message here."
        required
        disabled={accessDisabled}
      />
      <Input
        onChange={handleChange("email")}
        value={ticket?.email}
        name="email"
        className="my-8"
        guiName="Email*"
        required
        accessDisabled={accessDisabled}
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
