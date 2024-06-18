import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import AccountAction from "@/components/ui/Profile/Settings/AccountAction";
import ThemeSwitch from "@/components/ui/Profile/Settings/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Wrapper from "@/components/ui/wrapper";

function SettingsPage() {
  return (
    <Wrapper>
      <ProfileHeader
        topText={"Settings"}
        bottomText={"Change your preferences"}
      />

      <div className="mt-8 flex flex-col">
        <div className="flex flex-row my-2 items-center">
          <Checkbox /> <p className="ml-2">I want to receive newsletters</p>
        </div>
        <div className="flex flex-row my-2 items-center">
          <Checkbox />{" "}
          <p className="ml-2">I want to be notified about price drops</p>
        </div>
        <div className="flex flex-row my-2">
          <Checkbox className="mt-1" />{" "}
          <p className="ml-2">
            I want to be notified about recently added eBooks and trending
            eBooks
          </p>
        </div>
      </div>
      <ThemeSwitch />
      <div className="mt-16">
        <AccountAction />
      </div>
    </Wrapper>
  );
}

export default SettingsPage;
