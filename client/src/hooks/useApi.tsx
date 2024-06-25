import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useLocation } from "react-router-dom";
import useNavigation from "./useNavigation";
import { useToast } from "@/components/ui/use-toast";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ToastType = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};
function useApi() {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigation();
  const axiosPrivate = useAxiosPrivate();
  const [apiLoading, setApiLoading] = useState<boolean | undefined>(undefined);
  async function sendReq(
    url: string,
    method: HttpMethod,
    successToast?: ToastType,
    reqBody?: any
  ) {
    setApiLoading(true);
    let response;
    let err;
    try {
      switch (method) {
        case "GET":
          response = await axiosPrivate.get(url);
          break;
        case "POST":
          response = await axiosPrivate.post(url, reqBody);
          break;
        case "PUT":
          response = await axiosPrivate.put(url, reqBody);
          break;

        case "DELETE":
          response = await axiosPrivate.delete(url);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
      if (successToast) {
        toast(successToast);
      }
    } catch (error: any) {
      if (error.response.status == 401) {
        navigate({ path: "/access", state: { from: location }, replace: true });
      }
      toast({
        title: "Error!",
        description: "Something went wrong.",
        variant: "destructive",
      });
      console.log(error);
      err = error;
    } finally {
      setApiLoading(false);
    }

    return { response, err };
  }

  return { sendReq, apiLoading };
}

export default useApi;
