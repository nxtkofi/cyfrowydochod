import { useState } from "react";
import { Input } from "../input";

function SearchBar({ ...props }) {
  const [searchValue, setSearchValue] = useState<string>();
  const handleChange = (value: string) => {
    let newVal;
    if (value.includes("  ")) {
      newVal = value.replace("  ", " ");
    }
    setSearchValue(newVal);
  };
  return (
    <div>
      <Input
        validationRules={{
          min: 0,
          max: 50,
          spaceAllowed: true,
          mustContain: {
            bigLetter: false,
            specialChar: false,
            number: false,
          },
        }}
        value={searchValue}
        handleChange={handleChange}
        {...props}
        placeholder="I wanna search for..."
      />
    </div>
  );
}

export default SearchBar;
