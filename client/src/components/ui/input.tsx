import * as React from "react";

import { cn } from "@/lib/utils";
import useValidation from "@/helpers/useValidation";
import { ValidationPresetsType, ValidationRulesType } from "@/types";

const ValidationPresets: ValidationPresetsType = {
  email: {
    min: 5,
    max: 30,
    spaceAllowed: false,
    mustContain: {
      bigLetter: false,
      number: false,
      specialChar: true,
    },
  },
  username: {
    min: 4,
    max: 15,
    spaceAllowed: false,
    mustContain: {
      bigLetter: false,
      number: false,
      specialChar: false,
    },
  },
  password: {
    min: 8,
    max: 30,
    spaceAllowed: false,
    mustContain: {
      bigLetter: true,
      number: true,
      specialChar: true,
    },
  },
};
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  guiName?: string;
  divClassName?: string;
  accessDisabled?: boolean;
  preset?: keyof ValidationPresetsType;
  validationRules?: ValidationRulesType;
  isLoading: boolean;
  handleChange: (value: string) => void;
}

const getValidationRules = (
  presetName: keyof ValidationPresetsType,
  customRules?: ValidationRulesType
): ValidationRulesType => {
  return customRules || ValidationPresets[presetName];
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  guiName?: string;
  divClassName?: string;
  accessDisabled?: boolean;
  preset?: keyof ValidationPresetsType;
  validationRules?: ValidationRulesType;
  isLoading: boolean;
  handleChange: (value: string) => void; // Zmieniono nazwę z onChange na handleChange
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    divClassName,
    accessDisabled,
    guiName,
    validationRules,
    preset,
    handleChange,
    ...props
  }) => {
    const rules = preset
      ? getValidationRules(preset, validationRules)
      : (validationRules as ValidationRulesType);
    const {
      value,
      error,
      handleChange: validateChange,
    } = useValidation("", rules);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const moveFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
      validateChange(e.target.value);
      handleChange(e.target.value);
    };
    return (
      <div
        className={`relative ${divClassName ? divClassName : ""} ${
          accessDisabled ? "cursor-not-allowed" : ""
        }`}
      >
        <input
          onChange={handleChanges}
          value={value}
          type={type}
          placeholder=""
          className={cn(
            " transition duration-200 uiinput flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
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
          <span className="text-red-400">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
