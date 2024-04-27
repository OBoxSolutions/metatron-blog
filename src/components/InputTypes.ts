import { FieldError, Path, PathValue } from "react-hook-form";

export type InputPattern = {
  value: RegExp;
  message: string;
};

export type ValidationAttribute = {
  value: number;
  message: string;
};

export type InputProps<T> = {
  id?: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  defaultValue?: string;
  registerName?: string;
  register?: any;
  required?: boolean | string;
  pattern?: InputPattern;
  min?: number | ValidationAttribute;
  minLength?: number | ValidationAttribute;
  max?: number | ValidationAttribute;
  maxLength?: number | ValidationAttribute;
  validate?: (value: PathValue<T, Path<T>>) => boolean | string;
  error?: FieldError;
  children?: React.ReactNode;
  className?: string;
};
