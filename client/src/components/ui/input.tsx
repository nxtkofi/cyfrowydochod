import * as React from "react";
import useValidation from "@/hooks/useValidation";
import {
  ValidationPresetsType,
  ValidationRulesType,
  infoElementDetailsType,
} from "@/types";
import { useEffect } from "react";
import InfoElement from "../InfoElement";

const ValidationPresets: ValidationPresetsType = {
  email: {
    min: 4,
    max: 40,
    spaceAllowed: false, // Spacje nie są dozwolone w emailach
    mustContain: {
      bigLetter: false,
      number: false,
      specialChar: true,
    },
    mustBeEmail: true,
  },
  username: {
    min: 4,
    max: 20,
    spaceAllowed: false, // Spacje nie są dozwolone w nazwach użytkowników
    mustContain: {
      bigLetter: false,
      number: false,
      specialChar: false,
    },
    mustBeEmail: false,
  },
  password: {
    min: 8,
    max: 30,
    spaceAllowed: false, // Spacje nie są dozwolone w hasłach
    mustContain: {
      bigLetter: true,
      number: true,
      specialChar: true,
    },
    mustBeEmail: false,
  },
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  guiName?: string;
  accessDisabled?: boolean;
  preset?: keyof ValidationPresetsType;
  validationRules?: ValidationRulesType;
  handleChange?: (value: string) => void; // Zmieniono nazwę z onChange na handleChange
  initValue?: string;
  setParentError?: (hasError: boolean) => void;
  infoElementDetails?: infoElementDetailsType;
}

const getValidationRules = (
  presetName?: keyof ValidationPresetsType,
  customRules?: ValidationRulesType
): ValidationRulesType => {
  if (customRules) return customRules;
  if (presetName && ValidationPresets[presetName])
    return ValidationPresets[presetName];
  return {
    min: 1,
    max: 10000,
    spaceAllowed: true,
    mustContain: {
      bigLetter: false,
      number: false,
      specialChar: false,
    },
    mustBeEmail: false,
  };
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    accessDisabled,
    guiName,
    validationRules,
    preset,
    handleChange,
    setParentError,
    initValue,
    infoElementDetails,
    ...props
  }) => {
    const rules = getValidationRules(preset, validationRules);
    const { value, error, handleUseNavigationChange } = useValidation(
      initValue ? initValue : "",
      rules
    );
    const inputRef = React.useRef<HTMLInputElement>(null);
    const moveFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (handleChange) {
        handleChange(e.target.value);
      }
      handleUseNavigationChange(e.target.value);
    };
    useEffect(() => {
      if (setParentError) {
        setParentError(!!error);
      }
    }, [error, setParentError]);
    return (
      <div
        className={`relative my-4 ${
          accessDisabled ? "cursor-not-allowed" : ""
        }`}
      >
        <input
          onChange={handleChanges}
          value={value}
          type={type}
          placeholder=""
          className={`
            transition duration-200 uiinput flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
            ${className ? className : ""}
            ${value.length > 0 && !error ? "border-green-300 border-2" : ""}
            ${value.length > 0 && error ? "border-red-400 border-2" : ""}
          `}
          ref={inputRef}
          disabled={accessDisabled}
          {...props}
        />
        <span
          onClick={moveFocus}
          className={`font-medium transform transition-transform translate uiinputspan absolute top-2 left-2 ${
            accessDisabled ? "text-slate-400" : ""
          }`}
        >
          {guiName}
        </span>
        {value.length > 0 && error && (
          <span className="text-red-400 absolute right-0 z-10 text-sm">
            {error}
          </span>
        )}
        {infoElementDetails && (
          <InfoElement className="right-2 top-2" infoElementDetails={infoElementDetails} />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
