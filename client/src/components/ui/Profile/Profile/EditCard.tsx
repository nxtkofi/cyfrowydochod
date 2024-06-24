import { useState } from "react";
import ConfirmPassword from "./ConfirmPassword";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../card";
import EditForm from "./EditForm";
import { handleInputChangeType, UserUpdateModel } from "@/types";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

function EditCard() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  let initialInput: UserUpdateModel = {
    email: auth!.email,
    username: auth!.username,
    password: "",
  };

  const [input, setInput] = useState<UserUpdateModel>(initialInput);
  const [accessDisabled, setAccessDisabled] = useState<boolean>(false);

  const handleInputChange: handleInputChangeType = (inputValue, inputName) => {
    setInput((prev) => ({ ...prev, [inputName]: inputValue }));
    console.log(input);
  };

  const handleUserUpdate = async (user: UserUpdateModel) => {
    console.log(auth);
    try {
      const response = await axiosPrivate.put(
        `/api/users/id/${auth?.id}`,
        user
      );
      console.log("Updating user... Response:", await response.data);
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  return (
    <Card className="w-full md:max-w-96 mt-8">
      <CardHeader className="flex self-center">
        <CardTitle>Edit profile</CardTitle>
        <CardDescription>
          Make changes to your profile here. Click <i>Save changes</i> when
          you're done
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EditForm
          handleInputChange={(value, name) => handleInputChange(value, name)}
          setAccessDisabled={setAccessDisabled}
          setInput={setInput}
          input={input}
          initialInput={initialInput}
        />
      </CardContent>
      <CardFooter className="flex">
        <div className="flex-grow"></div>
        <ConfirmPassword
          onClick={() => handleUserUpdate(input)}
          accessDisabled={accessDisabled}
          handleInputChange={(value, name) => handleInputChange(value, name)}
          input={input}
        />
      </CardFooter>
    </Card>
  );
}

export default EditCard;
