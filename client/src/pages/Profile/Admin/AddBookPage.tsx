import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Wrapper from "@/components/ui/wrapper";
import { BookTypeRequest, iconElementsType } from "@/types";
import ColorPicker from "react-best-gradient-color-picker";
import { ChangeEvent, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { iconNames } from "@/constants";
import IconListForm from "@/components/ui/Admin/IconListForm";
import AddFeatureForm from "@/components/ui/Admin/AddFeatureForm";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "@/components/ui/Profile/ProfileHeader";

function AddBookPage() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [textBlack, setTextBlack] = useState<boolean>(false);
  const [hasErr, setHasErr] = useState<boolean>(false);
  const { sendReq } = useApi();
  const [color, setColor] = useState(
    "linear-gradient(20deg, rgba(83,244,234,1) 0%, RGBA(240, 142, 249, 0.72) 100%)",
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

  // Fetch book data when in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchBook = async () => {
        const { response } = await sendReq(`/api/books/${id}`, "GET");

        if (response) {
          const bookData = (await response).data;

          setInput({
            newBook: {
              longDescription: bookData.longDescription || "",
              shortDescription: bookData.shortDescription || "",
              subTitle: bookData.subTitle || "",
              firstText: bookData.firstText || "",
              secondText: bookData.secondText || "",
              title: bookData.title || "",
              author: bookData.author || "",
              price: bookData.price || 0,
              gradient: bookData.gradient || color,
              imagePath: bookData.imagePath || "",
              checksTableTextBlack: bookData.checksTableTextBlack || false,
              isHeroBook: bookData.isHeroBook || false,
            },
            bookFeaturesList: bookData.bookFeatures || [],
            bookIconElementsList: bookData.iconElements || [],
          });

          setColor(bookData.gradient || color);
          setTextBlack(bookData.checksTableTextBlack || false);
        }
      };
      
      fetchBook();
    }
  }, [id, isEditMode]);

  const saveBook = async () => {
    try {
      if (isEditMode) {
        // Update existing book
        await sendReq(`/api/books/${id}`, "PUT", input, {
          title: "Book updated",
          description: "Book updated successfully!",
        });
      } else {
        // Create new book
        await sendReq("/api/books", "POST", input, {
          title: "Book submitted",
          description: "Book submitted successfully!",
        });
      }
      navigate("/profile/adminpanel/manage-books");
    } catch (error) {
      console.error("Failed to save book:", error);
    }
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

  // Header text based on mode
  const headerTopText = isEditMode ? "Edit Book" : "Add Book";
  const headerBottomText = isEditMode ? "Update your ebook details" : "Create new ebook";
  const buttonText = isEditMode ? "Update eBook" : "Add eBook";

  return (
    <Wrapper>
      <ProfileHeader
        topText={headerTopText}
        bottomText={headerBottomText}
      />
      <div className="flex flex-col">
        <Input
          value={input?.newBook.title}
          infoElementDetails={{
            imgSrc: "/instructions/title.png",
            title: "Title",
            description: "Enter title of your ebook",
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
            description: "Enter author of your ebook",
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
            checked={input.newBook.isHeroBook}
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
        <div className="flex space-x-4">
          <Button onClick={saveBook}>{buttonText}</Button>
          {isEditMode && (
            <Button
              variant="outline"
              onClick={() => navigate("/profile/adminpanel/manage-books")}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default AddBookPage;
