import { iconNames } from "@/constants";
import { ValidationRulesType } from "@/types";
import { useEffect, useState } from "react";
import validator from "validator";

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
    if (validationRules.isIcon) {
      if (!iconNames.includes(text)) {
        setError("Must be a valid Lucide Icon name.");
      }
    } else if (validationRules.mustBeEmail) {
      validator.isEmail(text);
    } else if (text.length < validationRules.min) {
      setError("Value is too short!");
    } else if (text.length > validationRules.max) {
      setError("Value is too long!");
    } else if (!validationRules.spaceAllowed && text.includes(" ")) {
      setValue(text.trim());
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

  const handleUseNavigationChange = (newValue: string) => {
    if (!validationRules.spaceAllowed) {
      newValue = newValue.trim();
    } else {
      if (newValue.includes("  ")) {
        newValue = newValue.replace("  ", " ");
      }
    }
    setValue(newValue);
  };

  return { validate, value, handleUseNavigationChange, isLoading, error };
}

export default useValidation;
