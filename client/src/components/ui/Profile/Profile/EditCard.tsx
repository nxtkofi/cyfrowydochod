import { Button } from "../../button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../card";
import { Input } from "../../input";

function EditCard() {
  return (
    <Card className="w-full md:max-w-96 mt-8">
      <CardHeader className="flex self-center">
        <CardTitle>Edit profile</CardTitle>
        <CardDescription>
          Make changes to your profile here. Click <i>Save changes</i> when you're done
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center w-full">
            <label className="w-24 text-right mr-4" htmlFor="email">
              Email
            </label>
            <Input className="w-72 md:w-fit " name="email" id="email" />
          </div>
          <div className="flex items-center">
            <label className="w-24 text-right mr-4" htmlFor="username">
              Username
            </label>
            <Input className="w-72 md:w-fit" name="username" id="username" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex">
        <div className="flex-grow"></div>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
}

export default EditCard;
