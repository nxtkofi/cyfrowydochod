import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type ReactElement } from "react";

//TODO: Add Turnstile integration

export interface RestorePasswordPageProps {}
export function RestorePasswordPage(
  props: RestorePasswordPageProps,
): ReactElement {
  return (
    <section className="h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Restore password</CardTitle>
          <CardDescription>
            Enter your email to restore your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name">Email</label>
                <Input id="name" placeholder="Type your email here" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex w-full">
          <Button className="ml-auto">Submit</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
