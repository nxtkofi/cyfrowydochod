import { ChangeEvent, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useApi from "@/hooks/useApi";
import Loader from "../loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";

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
    await sendReq("/api/tickets", "POST", ticket, {
      title: "Success!",
      description: "Ticket submission successfull!",
    });
  };

  const handleChange = (value: string, name: string) => {
    setTicket((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(ticket);
  };

  return (
    <div className="mt-24">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Contact us</CardTitle>
          <CardDescription>
            Leave a ticket, we'll respond to you shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="subject">Subject*</label>
              <Input
                id="subject"
                value={ticket.subject}
                onChange={(e) => handleChange(e.target.value, "subject")}
                placeholder="Enter subject"
                disabled={accessDisabled}
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="orderId">OrderId</label>
              <Input
                id="orderId"
                value={ticket.orderId}
                onChange={(e) => handleChange(e.target.value, "orderId")}
                placeholder="Enter order ID"
                disabled={accessDisabled}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="message">Message*</label>
              <Textarea
                id="message"
                value={ticket.message}
                onChange={(e) => handleChange(e.target.value, "message")}
                placeholder="Please type your message here."
                rows={8}
                disabled={accessDisabled}
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="email">Email*</label>
              <Input
                id="email"
                type="email"
                value={ticket.email}
                onChange={(e) => handleChange(e.target.value, "email")}
                placeholder="Enter your email"
                disabled={accessDisabled}
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex w-full">
          <Button
            className="ml-auto"
            onClick={submitTicket}
            disabled={accessDisabled}
          >
            {apiLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Send"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ContactUsForm;
