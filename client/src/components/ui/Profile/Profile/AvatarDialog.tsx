import { avatars } from "@/constants";
import { avatarType } from "@/types";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../alert-dialog";
import { SetStateAction, useState } from "react";
import { Button } from "../../button";

interface IAvatarDialogProps {
  avatarImg: avatarType;
  setAvatarImg: React.Dispatch<SetStateAction<avatarType>>;
}

export function AvatarDialog({ avatarImg, setAvatarImg }: IAvatarDialogProps) {
  const [temporaryAvatar, setTemporaryAvatar] = useState<avatarType>(avatarImg);

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
                {(avatars as avatarType[]).map((avatar) => (
                  <div key={avatar} onClick={() => setTemporaryAvatar(avatar)}>
                    <img
                      src={`/avatars/${avatar}.jpg`}
                      className={`w-24 h-24 rounded-full m-2 cursor-pointer 
                        ${
                          avatar === temporaryAvatar
                            ? "brightness-100"
                            : "brightness-50"
                        } hover:brightness-100 transition-all`}
                    />
                  </div>
                ))}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setAvatarImg(temporaryAvatar)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

