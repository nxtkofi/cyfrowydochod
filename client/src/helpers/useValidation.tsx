import { ValidationRulesType } from "@/types";
import { useEffect, useState } from "react";

function useValidation(
  initialValue: string,
  validationRules: ValidationRulesType
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    validate(value);
  }, [value]);

  const validate = (text: string) => {
    setIsLoading(true);
    setError(null);

    if (text.length < validationRules.min) {
      setError("Value is too short!");
    } else if (text.length > validationRules.max) {
      setError("Value is too long!");
    } else if (!validationRules.spaceAllowed && text.includes(" ")) {
        setError("Space is not allowed!");
      
    } else if (validationRules.mustContain) {
      if (validationRules.mustContain.bigLetter && !/[A-Z]/.test(text)) {
        setError("Must contain at least one uppercase letter!");
      } else if (validationRules.mustContain.number && !/\d/.test(text)) {
        setError("Must contain at least one number!");
      } else if (
        validationRules.mustContain.specialChar &&
        !/[!@#$%^&*(),.?":{}|<>]/.test(text)
      ) {
        setError("Must contain at least one special character!");
      }
    }

    setIsLoading(false);
  };

  const handleChange = (newValue: string) => {
    if(!validationRules.spaceAllowed){
        newValue = newValue.trim();
    }
   setValue(newValue)
  };

  return { validate, value, handleChange, isLoading, error };
}

export default useValidation;
