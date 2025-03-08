import ContactUsForm from "@/components/ui/ContactPage/ContactUsForm";
import TextDefault from "@/components/ui/HomePage/TextDefault";
import Wrapper from "@/components/ui/wrapper";
import useAuth from "@/hooks/useAuth";

function ContactPage() {
  const { auth } = useAuth();
  return (
    <Wrapper className="md:border-2 md:border-gray-400 md:rounded-lg md:px-16 md:py-8">
      <TextDefault className="" bigTitle center variant="default">
        Contact us
      </TextDefault>
      <TextDefault center variant="secondary">
        {" "}
        Leave a ticket, we'll respond to you shortly.
      </TextDefault>
      <ContactUsForm accessDisabled={auth?.accessToken ? false : true} />
    </Wrapper>
  );
}

export default ContactPage;
