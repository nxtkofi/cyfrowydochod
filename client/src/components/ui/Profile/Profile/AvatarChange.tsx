import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { AuthType, avatarType } from "@/types";
import {  useEffect, useState } from "react";
import { AvatarDialog } from "./AvatarDialog";

interface IAvatarChange {
  auth:AuthType
}

function AvatarChange({auth}:IAvatarChange) {
  const { sendReq, apiLoading } = useApi();
  const { setAuth } = useAuth();  
  const [avatarImg, setAvatarImg] = useState<avatarType | undefined>(auth.preferences.avatar);

  useEffect(() => {
    const changeAvatar = async () => {
      if (avatarImg !== auth!.preferences.avatar && auth!.preferences.avatar) {
        const avatarChangeBody = {
          avatar: avatarImg,
        };
        await sendReq(
          `/api/userpreferences/${auth!.id}/preferences`,
          "PUT",
          avatarChangeBody,
          { description: "Avatar changed successfully!" },
        );
        setAuth((prev) => {
          if (!prev) return prev; // Handle the case where prev is undefined
          return {
            ...prev,
            preferences: {
              ...prev.preferences,
              avatar: avatarImg,
            },
          };
        });
      }
    };
    changeAvatar();
  }, [avatarImg, auth]);

  return (
    <>
      <div className="flex flex-col justify-center items-center my-8">
        <img
          src={`/avatars/${avatarImg}.jpg`}
          className="w-52 h-52 rounded-full"
        />
        <div className="w-fit my-8">
          <AvatarDialog avatarImg={avatarImg} setAvatarImg={setAvatarImg} />
        </div>
      </div>
    </>
  );
}


export default AvatarChange;
