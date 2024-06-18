import { Button } from "../../button";
import ProfileHeader from "../ProfileHeader";

function AccountAction() {
  return (
    <>
      <ProfileHeader bottomOnly bottomText="Account settings" />
      <div className="flex flex-col">
        <div className="flex flex-col items-center ">
          <Button className="my-4">Suspend account</Button>
          <p>
            If You have security doubts, or You suspect third-party access, then
            click this button to suspend your account. After 48 hours an email
            will be sent to You containing re-activation link.
          </p>
        </div>
        <div className="flex flex-col mt-8">
          <Button className=" my-4 w-fit self-center" variant="destructive">
            Delete account
          </Button>
          <p>Click this button to delete Your account.</p>
        </div>
      </div>
    </>
  );
}

export default AccountAction;
