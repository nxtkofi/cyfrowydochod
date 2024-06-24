import { useEffect } from "react";
import { Input } from "../../input";
import { handleInputChangeType, UserUpdateModel } from "@/types";

type EditFormProps = {
  setAccessDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<UserUpdateModel>>;
  input: UserUpdateModel;
  initialInput: UserUpdateModel;
  handleInputChange: handleInputChangeType;
};

function EditForm({
  setAccessDisabled,
  handleInputChange,
  input,
  initialInput,
}: EditFormProps) {
  useEffect(() => {
    if (
      input.email === initialInput.email &&
      input.username === initialInput.username
    ) {
      setAccessDisabled(true);
    } else {
      setAccessDisabled(false);
    }
  }, [input, initialInput]);

  return (
    <div className="space-y-4">
      <div className="flex items-center w-full">
        <label className="w-24 text-right mr-4" htmlFor="email">
          Email
        </label>
        <Input
          handleChange={(value: string) =>
            handleInputChange(value,"email")
          }
          value={input.email}
          className="w-72 md:w-fit"
          name="email"
          id="email"
          preset="email"
          isLoading={false}
        />
      </div>
      <div className="flex items-center">
        <label className="w-24 text-right mr-4" htmlFor="username">
          Username
        </label>
        <Input
          handleChange={(value: string) =>
            handleInputChange(value,"username")
          }
          value={input.username}
          className="w-72 md:w-fit"
          name="username"
          id="username"
          preset="username"
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default EditForm;
