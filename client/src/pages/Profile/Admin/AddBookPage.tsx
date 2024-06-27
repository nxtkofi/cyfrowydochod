import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Wrapper from "@/components/ui/wrapper";
import { BookType } from "@/types";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";
import { ChangeEvent, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";

function AddBookPage() {
  const {sendReq,err} = useApi();
  const [color, setColor] = useState(
    "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)"
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { setSolid, setGradient } = useColorPicker(color, setColor);
  const [iconElements, setIconElements] = useState();
  const [input, setInput] = useState<BookType>({
    semiLongDescription: "",
    shortDescription: "",
    subTitle: "",
    firstText: "",
    secondText: "",
    title: "",
    author: "",
    price: 0,
    bookFeatures: [""],
    gradient: "",
    imagePath: "",
    emojiGradientUrl: "",
    checksTableTextBlack: false,
    iconElements: [
      {
        icon: "target",
        text: "",
      },
    ],
  });
  const submitBook = async()=>{

    try {
      await sendReq('/api/books',"POST",input,{title:"Book submitted.",description:"Book submitted successfully!"})
    } catch (error) {
      
    }
  } 
   useEffect(() => {
    console.log(color);
  }, [color, setColor]);
  const handleShowColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };
  const handleChange =
    (name: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInput((prev) => {
        return { ...prev, [name]: value };
      });
      console.log(input);
    };

  return (
    <Wrapper>
      <div className="flex flex-col">
        <Input
          value={input?.title}
          infoElement={{
            title: "Title",
            description: "Enter title of your new eBook!",
          }}
          guiName="Title"
          onChange={handleChange("title")}
        />
        <Input
          infoElement={{
            title: "Author",
            description: "Enter author of your new eBook!",
          }}
          guiName="Author"
          value={input?.author}
          onChange={handleChange("author")}
        />
        <Input
          guiName="Price"
          infoElement={{
            title: "Price",
            description: "How much is your book going to sell for?",
          }}
          value={input?.price}
          onChange={handleChange("price")}
        />
        <div className="flex-col">
          <div className="flex flex-row">
            <Button className="relative" onClick={handleShowColorPicker}>
              Set gradient
            </Button>
            <div
              style={{ background: color }}
              className="w-10 h-10 ml-12 rounded-sm"
            ></div>
          </div>
          {showColorPicker && (
            <div className="p-4 bg-[#FBFBFB] rounded-md absolute z-30">
              <ColorPicker value={color} onChange={setColor} />
            </div>
          )}
          <div className="text-sm my-2">{color}</div>
        </div>

        <Input
          onChange={handleChange("imagePath")}
          value={input?.imagePath}
          guiName="Image path url"
        />
        <Input
          accessDisabled={true}
          // onChange={handleChange("iconGradient")}
          // value={input?.iconGradient}
          guiName="Icon gradient"
        />

        <div className="flex flex-col">
          <Input
            accessDisabled={true}
            // onChange={handleChange("icon")}
            // value={input?.iconElements}
            guiName="Icon"
          />
          <Input
            accessDisabled={true}
            // onChange={handleChange("text")}
            // value={input?.text}
            guiName="Icon text"
          />
          <Button disabled={true}>Add element</Button>
        </div>
        <div className="flex flex-col">
          {/* <p>Book features</p> */}
          <Input
            accessDisabled={true}
            // onChange={handleChange("features")}
            // value={input?.features}
            guiName="Feature"
          />
          <Button disabled={true}>Add feature</Button>
        </div>
        <Textarea
          placeholder="subTitle"
          value={input?.subTitle}
          onChange={handleChange("subTitle")}
          className="my-2"
        />
        <Textarea
          placeholder="firstText"
          value={input?.firstText}
          onChange={handleChange("firstText")}
          className="my-2"
        />
        <Textarea
          placeholder="secondText"
          value={input?.secondText}
          onChange={handleChange("secondText")}
          className="my-2"
        />
        <Textarea
          placeholder="shortDescription"
          value={input?.shortDescription}
          onChange={handleChange("shortDescription")}
          className="my-2"
        />
        <Textarea
          placeholder="semiLongDescription"
          value={input?.semiLongDescription}
          onChange={handleChange("semiLongDescription")}
          className="my-2"
        />
        <Button onClick={submitBook}>Add eBook</Button>
      </div>
    </Wrapper>
  );
}

export default AddBookPage;
