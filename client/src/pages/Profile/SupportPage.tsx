import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import TicketCard from "@/components/ui/Profile/Support/TicketCard";
import Wrapper from "@/components/ui/wrapper";
import { Tickets } from "@/constants";

function SupportPage() {
    return ( <Wrapper>
        <ProfileHeader topText={"Support"} bottomText={"View/manage your tickets"}/>
        {Tickets.map((ticket)=>(
            
                <TicketCard ticket={ticket}/>
            
        )
            
        )}    
    </Wrapper> );
}

export default SupportPage;