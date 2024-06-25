import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { avatars } from "@/constants";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

function AvatarChange() {
  const { sendReq, apiLoading } = useApi();
  const { auth } = useAuth();
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    const getUserInfo = async () => {
      const { response, err } = await sendReq(`/api/users/${auth?.id}`, "GET");
      console.log(response);
      setAvatar(response?.data.avatar);
    };
    getUserInfo();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center my-8">
        <img
          src={`/avatars/${avatar}.jpg`}
          className="w-52 h-52 rounded-full"
        />
        <div className="w-fit my-8">
          <AvatarDialog />
        </div>
      </div>
    </>
  );
}

export function AvatarDialog() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Change avatar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Choose one of the options below</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="grid grid-cols-3">
                {avatars.map((avatar) => (
                  <div key={avatar}>
                    <img
                      src={avatar}
                      className="w-24 h-24 rounded-full m-2 cursor-pointer brightness-50 hover:brightness-100 transition-all"
                    />
                  </div>
                ))}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
export default AvatarChange;
