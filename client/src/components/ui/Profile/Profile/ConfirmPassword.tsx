import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../dialog";
import { Button } from "../../button";
import { DialogHeader, DialogFooter } from "../../dialog";
import { Input } from "../../input";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { handleInputChangeType, UserUpdateModel } from "@/types";

type ConfirmPasswordProps = {
  input: UserUpdateModel;
  accessDisabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  handleInputChange: handleInputChangeType;
};
function ConfirmPassword({
  onClick,
  input,
  accessDisabled,
  handleInputChange,
}: ConfirmPasswordProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={accessDisabled}>Save changes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm with password</DialogTitle>
          <DialogDescription>
            Enter your password in order to confirm changes.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              preset="password"
              value={input.password}
              handleChange={(value: string) =>
                handleInputChange(value, "password")
              }
              type="password"
              id="link"
              isLoading={false}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" onClick={onClick}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmPassword;
