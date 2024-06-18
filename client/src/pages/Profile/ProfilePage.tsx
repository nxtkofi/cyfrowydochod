import EditCard from "@/components/ui/Profile/Profile/EditCard";
import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import Wrapper from "@/components/ui/wrapper";

function ProfilePage() {
  return (
    <>
      <Wrapper>
        <ProfileHeader topText="Your profile" bottomText={"Hey @peduarte!"} />
        <div className="justify-center flex">
          <EditCard />
        </div>
        <div></div>
      </Wrapper>
    </>
  );
}

export default ProfilePage;
