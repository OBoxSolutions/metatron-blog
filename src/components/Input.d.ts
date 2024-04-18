export type InputProps = {
  id?: string;
  label?: string;
  required: boolean;
  name?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  type?: string;
  register?: UseFormRegister<IFormValues>;
};
