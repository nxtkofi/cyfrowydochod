import { ChangeEvent, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useApi from "@/hooks/useApi";
import Loader from "../loader";

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
  const { sendReq, apiLoading } = useApi();
  const [ticket, setTicket] = useState<sendingTicketType>({
    email: "",
    subject: "",
    orderId: "",
    message: "",
  });

  const submitTicket = async () => {
      await sendReq(
      "/api/tickets",
      "POST",
      { title: "Success!", description: "Ticket submission successfull!" },
      ticket
    );
  };

  const handleChange = (value: string, name: string) => {
    setTicket((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(ticket);
  };

  return (
    <div className="flex flex-col">
      <Input
        validationRules={{
          min: 4,
          max: 100,
          spaceAllowed: true,
          mustContain: {
            specialChar: false,
            number: false,
            bigLetter: false,
          },
        }}
        handleChange={(v) => handleChange(v, "subject")}
        guiName="Subject*"
        required
        accessDisabled={accessDisabled}
      />
      <Input
        validationRules={{
          min: 36,
          max: 36,
          spaceAllowed: true,
          mustContain: {
            specialChar: false,
            number: false,
            bigLetter: false,
          },
        }}
        handleChange={(v) => handleChange(v, "orderId")}
        guiName="OrderId (not required)"
        accessDisabled={accessDisabled}
      />
      <Textarea
        onChange={(e) => handleChange(e.target.value, "message")}
        value={ticket?.message}
        className="my-4"
        rows={8}
        placeholder="Please type your message here."
        required
        disabled={accessDisabled}
      />
      <Input
        preset="email"
        handleChange={(v) => handleChange(v, "email")}
        name="email"
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
          {apiLoading ? <Loader /> : "Send"}
        </Button>
      </div>
    </div>
  );
}

export default ContactUsForm;
