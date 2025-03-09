import ContactUsForm from "@/components/ui/ContactPage/ContactUsForm";
import useAuth from "@/hooks/useAuth";

function ContactPage() {
  const { auth } = useAuth();
  return <ContactUsForm accessDisabled={auth?.accessToken ? false : true} />;
}

export default ContactPage;
