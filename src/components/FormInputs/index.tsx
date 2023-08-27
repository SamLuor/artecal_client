import React from "react";
import "./style.css";

import { cleanErrorField } from "../../helper";

import { InputText as Input } from "primereact/inputtext";

interface PropsInputText {
  placeholder: string;
  value: string;
  setValue: (value: any) => void;
  setErrors: (value: any) => void;
  error: string;
  errors: object;
  field: string;
  label: string;
}

export const InputText = ({
  placeholder,
  value,
  setValue,
  errors,
  setErrors,
  error,
  field,
  label,
}: PropsInputText) => {
  return (
    <div className="mb-1 mt-2">
      <p className="text-label">{label || field}</p>
      <Input
        name={field}
        value={value}
        className={`p-inputtext-sm w-full ${error ? "p-invalid" : ""}`}
        placeholder={placeholder}
        onClick={(event) => {
          cleanErrorField(errors, setErrors, event.target.name);
        }}
        onChange={(event) =>
          setValue((e) => ({ ...e, [field]: event.target.value }))
        }
      />
      {error && <p className="errorValidate">{error}</p>}
    </div>
  );
};
