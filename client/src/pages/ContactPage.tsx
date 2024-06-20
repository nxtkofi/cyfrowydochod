import ContactUsForm from "@/components/ui/ContactPage/ContactUsForm";
import TextDefault from "@/components/ui/HomePage/textDefault";
import Wrapper from "@/components/ui/wrapper";
import useAuth from "@/hooks/useAuth";

function ContactPage() {
  const {auth} = useAuth();
  return (
    <Wrapper>
      <TextDefault className="" bigTitle center variant="default">
        Contact us
      </TextDefault>
      <TextDefault center variant="secondary"> Leave a ticket, we'll respond to you shortly.</TextDefault>      
      <div className="flex flex-col"><ContactUsForm accessDisabled={auth?.accessToken ? false : true}/></div>
    </Wrapper>
  );
}

export default ContactPage;
