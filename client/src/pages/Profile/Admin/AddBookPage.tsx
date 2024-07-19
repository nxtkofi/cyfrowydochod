import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Wrapper from "@/components/ui/wrapper";
import { BookTypeRequest, iconElementsType } from "@/types";
import ColorPicker from "react-best-gradient-color-picker";
import { ChangeEvent, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { book1Request, book2Request, book3Request, iconNames } from "@/constants";
import IconListForm from "@/components/ui/Admin/IconListForm";
import AddFeatureForm from "@/components/ui/Admin/AddFeatureForm";
import { Checkbox } from "@/components/ui/checkbox";

function AddBookPage() {
  const [textBlack, setTextBlack] = useState<boolean>(false);
  const [hasErr, setHasErr] = useState<boolean>(false);
  const { sendReq } = useApi();
  const [color, setColor] = useState(
    "linear-gradient(20deg, rgba(83,244,234,1) 0%, RGBA(240, 142, 249, 0.72) 100%)"
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [iconElements, setIconElements] = useState<iconElementsType>({
    icon: "",
    text: "",
  });
  const [featureInput, setFeatureInput] = useState<string>("");
  const [input, setInput] = useState<BookTypeRequest>({
    newBook: {
      longDescription: "",
      shortDescription: "",
      subTitle: "",
      firstText: "",
      secondText: "",
      title: "",
      author: "",
      price: 0,
      gradient: color,
      imagePath: "",
      checksTableTextBlack: false,
      isHeroBook: false,
    },
    bookFeaturesList: [],
    bookIconElementsList: [],
  });

  const submitBook = async () => {
    try {
      await sendReq("/api/books", "POST", input, {
        title: "Book submitted.",
        description: "Book submitted successfully!",
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (!iconNames.includes(iconElements.icon)) {
      console.log("fail");
    } else {
      console.log("You got it!");
    }
  }, [iconElements.icon]);

  const handleShowColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleInputChange = (value: string, name: string) => {
    if (name == "icon" || name == "text") {
      const newVal = name == "icon" ? value.trim() : value;
      setIconElements((prev) => ({
        ...prev,
        [name]: newVal,
      }));
    } else {
      setFeatureInput(value);
    }
  };
  useEffect(() => {
    setInput((prev) => {
      return { ...prev, newBook: { ...prev.newBook, gradient: color } };
    });
    console.log(color);
  }, [color]);
  const handleChange =
    (name: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;

      setInput((prev) => ({
        ...prev,
        newBook: {
          ...prev.newBook,
          [name]: name === "price" ? parseFloat(value) : value,
        },
      }));
    };

  const handleAddIconElement = () => {
    setInput((prev) => ({
      ...prev,
      bookIconElementsList: [
        ...(prev.bookIconElementsList ?? []),
        { icon: iconElements.icon, text: iconElements.text },
      ],
    }));
    console.log(input.bookIconElementsList);
    setIconElements({ icon: "", text: "" });
    setHasErr(true);
  };
  const handleAddFeature = () => {
    setInput((prev) => {
      return {
        ...prev,
        bookFeaturesList: [...prev.bookFeaturesList, featureInput],
      };
    });
    setFeatureInput("");
  };
  const changeColor = (text: string) => {
    setColor(text);
  };
  return (
    <Wrapper>
      <div className="flex flex-col">
        <Input
          value={input?.newBook.title}
          infoElementDetails={{
            imgSrc: "/instructions/title.png",
            title: "Title",
            description: "Enter title of your new eBook!",
          }}
          guiName="Title"
          onChange={handleChange("title")}
        />
        <Textarea
          guiName="Subtitle"
          value={input?.newBook.subTitle}
          onChange={handleChange("subTitle")}
          className="my-2"
        />
        <Input
          infoElementDetails={{
            imgSrc: "/instructions/author.png",
            title: "Author",
            description: "Enter author of your new eBook!",
          }}
          guiName="Author"
          value={input?.newBook.author}
          onChange={handleChange("author")}
        />
        <Input
          guiName="Price"
          infoElementDetails={{
            imgSrc: "/instructions/price.png",
            title: "Price",
            description: "How much is your book going to sell for?",
          }}
          value={input?.newBook.price}
          onChange={handleChange("price")}
        />
        <div className="flex-col">
          <div className="flex flex-row ">
            <Button className="relative" onClick={handleShowColorPicker}>
              Set gradient
            </Button>
            <div
              style={{ background: color }}
              className="w-28 h-10 ml-12 rounded-sm"
            ></div>
          </div>
          {showColorPicker && (
            <div className="p-4 bg-[#FBFBFB] rounded-md absolute z-30">
              <ColorPicker value={color} onChange={setColor} />
            </div>
          )}

          <Input
            className="mt-8"
            value={color}
            infoElementDetails={{
              title: "Gradient",
              description:
                "Here You are setting gradient (theme) for your ebook. This gradient (or color if You'd like) will be set on features and icons for that eBook.",
            }}
            onChange={(e) => changeColor(e.target.value)}
            guiName="Gradient value"
          ></Input>
        </div>

        <Input
          infoElementDetails={{
            title: "Choose image",
            description:
              "Choose an image for your eBook. This must be a link (can be AI generated) to any image. If fetching is successfull the image will appear below.",
            imgSrc: "/instructions/image.png",
          }}
          onChange={handleChange("imagePath")}
          value={input?.newBook.imagePath}
          guiName="Image path url"
        />
        {input.newBook.imagePath && (
          <img
            src={input.newBook.imagePath}
            className=" w-1/2 rounded-md mb-4 self-center"
          />
        )}
        <Textarea
          guiName="First text"
          value={input?.newBook.firstText}
          onChange={handleChange("firstText")}
          className="my-2"
        />
        <Textarea
          guiName="Second text"
          value={input?.newBook.secondText}
          onChange={handleChange("secondText")}
          className="my-2"
        />
        <IconListForm
          hasErr={hasErr}
          setHasErr={setHasErr}
          iconElements={iconElements}
          setInput={setInput}
          handleAddIconElement={handleAddIconElement}
          bookIconElementsList={input.bookIconElementsList}
          handleInputChange={handleInputChange}
        />

        <AddFeatureForm
          value={featureInput}
          handleAddFeature={handleAddFeature}
          handleInputChange={handleInputChange}
          setInput={setInput}
          features={input.bookFeaturesList}
          gradient={color}
          textBlack={textBlack}
          setTextBlack={setTextBlack}
        />

        <Textarea
          guiName="Short description"
          value={input?.newBook.shortDescription}
          onChange={handleChange("shortDescription")}
          className="my-2"
        />
        <Textarea
          guiName="Long description"
          value={input?.newBook.longDescription}
          onChange={handleChange("longDescription")}
          className="my-2"
        />
        <div className="flex flex-row my-4">
          <Checkbox
            onClick={() => {
              setInput((prev) => {
                return {
                  ...prev,
                  newBook: {
                    ...prev.newBook,
                    isHeroBook: !prev.newBook.isHeroBook,
                  },
                };
              });
            }}
            className="mt-1"
          />
          <p className="ml-2">I want this eBook to appear on the home page</p>
        </div>
        <Button onClick={submitBook}>Add eBook</Button>
      </div>
    </Wrapper>
  );
}

export default AddBookPage;
