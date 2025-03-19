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
import useApi from "@/hooks/useApi";
import { useEffect, useState, type ReactElement } from "react";
import { useParams } from "react-router-dom";

//TODO: Add Turnstile integration
export function RestorePasswordPage(): ReactElement {
  const [apiResponse, setApiResponse] = useState<{
    valid: boolean;
    email: string;
  } | null>(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ email: false, password: false });
  const { sendReq } = useApi();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const checkIfValid = async () => {
        try {
          const response = await sendReq(
            `/api/auth/password-reset/validate/${id}`,
            "GET",
          );
          setApiResponse(
            response?.response?.data || { valid: false, email: "" },
          );
        } catch (error) {
          console.error("Token validation failed:", error);
        } finally {
          setIsLoading(false);
        }
      };
      checkIfValid();
    }
  }, [id]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasError.email) return;

    setIsLoading(true);
    try {
      await sendReq(
        "/api/auth/password-reset/request",
        "POST",
        { email },
        {
          title: "Email sent",
          description: "Check your email for further instructions.",
        },
      );
    } catch (error) {
      console.error("Email request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasError.password) return;

    setIsLoading(true);
    try {
      await sendReq(
        "/api/auth/password-reset/reset",
        "POST",
        { token: id, newPassword: password },
        {
          title: "Password updated",
          description: "Your password has been successfully updated.",
        },
      );
    } catch (error) {
      console.error("Password reset failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && id) {
    return (
      <section className="h-screen flex items-center justify-center">
        <div>Loading...</div>
      </section>
    );
  }

  if (id && apiResponse?.valid) {
    return (
      <section className="h-screen flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Restore password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <Input
                    initValue={password}
                    guiName="Password"
                    name="password"
                    preset="password"
                    handleChange={setPassword}
                    setParentError={(hasErr) =>
                      setHasError((prev) => ({ ...prev, password: hasErr }))
                    }
                  />
                </div>
              </div>
              <CardFooter className="flex w-full p-0 mt-4">
                <Button
                  type="submit"
                  disabled={hasError.password || isLoading || !password}
                  className="ml-auto"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </section>
    );
  }

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
          <form onSubmit={handleEmailSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Input
                  initValue={email}
                  guiName="Email"
                  name="email"
                  preset="email"
                  handleChange={setEmail}
                  setParentError={(hasErr) =>
                    setHasError((prev) => ({ ...prev, email: hasErr }))
                  }
                />
              </div>
            </div>
            <CardFooter className="flex w-full p-0 mt-4">
              <Button
                type="submit"
                disabled={hasError.email || isLoading || !email}
                className="ml-auto"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
