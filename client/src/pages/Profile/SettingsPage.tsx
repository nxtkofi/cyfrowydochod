import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import AccountAction from "@/components/ui/Profile/Settings/AccountAction";
import ThemeSwitch from "@/components/ui/Profile/Settings/ThemeSwitch";
import { Checkbox } from "@/components/ui/checkbox";
import Wrapper from "@/components/ui/wrapper";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { UserPreferences } from "@/types";
import { useEffect, useState } from "react";

function SettingsPage() {
  const { sendReq, apiLoading } = useApi();
  const { auth } = useAuth();
  const [checks, setChecks] = useState<UserPreferences>(auth!.preferences);

  const handleClick =
    (name: keyof UserPreferences) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      setChecks((prev) => {
        if (!prev) return prev;
        return { ...prev, [name]: !prev[name] }; // Toggle the specific property
      });
    };
  useEffect(() => {
    sendReq(`/api/userpreferences/${auth!.id}/preferences`, "PUT", checks);
  }, [checks,setChecks]);

  return (
    <Wrapper>
      <ProfileHeader
        topText={"Settings"}
        bottomText={"Change your preferences"}
      />

      <div className="mt-8 flex flex-col">
        <div className="flex flex-row my-2 items-center">
          <Checkbox
            onClick={handleClick("getNewsLetter")}
            checked={checks.getNewsLetter}
            defaultChecked={auth?.preferences.getNewsLetter}
          />{" "}
          <p className="ml-2">I want to receive newsletters</p>
        </div>
        <div className="flex flex-row my-2 items-center">
          <Checkbox
            onClick={handleClick("getPriceDrops")}
            checked={checks.getPriceDrops}
          />{" "}
          <p className="ml-2">I want to be notified about price drops</p>
        </div>
        <div className="flex flex-row my-2">
          <Checkbox
            onClick={handleClick("getTrendingEbooks")}
            checked={checks.getTrendingEbooks}
            className="mt-1"
          />{" "}
          <p className="ml-2">
            I want to be notified about recently added eBooks and trending
            eBooks
          </p>
        </div>
      </div>
      <ThemeSwitch checks={checks} handleClick={handleClick} />
      <div className="mt-16">
        <AccountAction />
      </div>
    </Wrapper>
  );
}

export default SettingsPage;
