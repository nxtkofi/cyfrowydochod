import AvatarChange from "@/components/ui/Profile/Profile/AvatarChange";
import EditCard from "@/components/ui/Profile/Profile/EditCard";
import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import Wrapper from "@/components/ui/wrapper";

function ProfilePage() {
  
  return (
    <>
      <Wrapper>
        <ProfileHeader topText="Your profile" bottomText={"Hey @peduarte!"} />
      </Wrapper> {/* Think of a custom wrapper here so that it's gonna wrap a whole component when not in mobile. */}
        <div className="justify-center flex">
          <EditCard />
        </div>
        <div>
          <AvatarChange  />
        </div>
    </>
  );
}

export default ProfilePage;
