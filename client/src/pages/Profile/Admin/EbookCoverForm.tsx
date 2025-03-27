import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useApi from "@/hooks/useApi";
import { EbookCoverRequestType } from "@/types";
import { SetStateAction, useState, type ReactElement } from "react";

export interface EbookCoverFormProps {
  setImageUrl: React.Dispatch<SetStateAction<string>>;
}

export function EbookCoverForm(props: EbookCoverFormProps): ReactElement {
  const [form, setForm] = useState<EbookCoverRequestType>({
    title: "",
    description: "",
    styles: "",
    color: { main: "", secondary: "" },
  });
  const { sendReq } = useApi();

  async function generateCover() {
    const { response } = await sendReq(
      "/api/generate/ebook-cover",
      "POST",
      form,
    );
    props.setImageUrl(response.data);
  }
  const handleChange = (
    field: keyof EbookCoverRequestType | "main" | "secondary",
    value: string,
  ) => {
    setForm((prev) => {
      if (field === "main") {
        return {
          ...prev,
          color: { ...prev.color, main: value },
        };
      } else if (field === "secondary") {
        return {
          ...prev,
          color: { ...prev.color, secondary: value },
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate Image with AI &nbsp;✨</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title*
            </Label>
            <Input
              handleChange={(value) => handleChange("title", value)}
              id="tilte"
              className="col-span-3 w-max"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description*
            </Label>
            <Textarea
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              id="description"
              className="col-span-3 w-max border-gray-200 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Dominant color
            </Label>
            <Input
              placeholder="Blue, #DBACB4 etc"
              handleChange={(value) => handleChange("main", value)}
              id="tilte"
              className="col-span-3 w-max"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Secondary color
            </Label>
            <Input
              handleChange={(value) => handleChange("secondary", value)}
              placeholder="Gold, #08AFB4 etc"
              id="tilte"
              className="col-span-3 w-max"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="styles" className="text-right">
              Styles*
            </Label>
            <Input
              className="col-span-3 w-max"
              id="styles"
              placeholder="Cartoon, Minimalistic etc"
              handleChange={(value) => handleChange("styles", value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => generateCover()}>Generate ✨</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
