import ContactUsForm from "@/components/ui/ContactPage/ContactUsForm";
import Wrapper from "@/components/ui/wrapper";
import useAuth from "@/hooks/useAuth";

function ContactPage() {
  const { auth } = useAuth();
  return (
    <Wrapper>
      <ContactUsForm accessDisabled={auth?.accessToken ? false : true} />
    </Wrapper>
  );
}

export default ContactPage;
