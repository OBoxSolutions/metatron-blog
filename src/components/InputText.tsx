import { InputProps } from "./InputTypes";
import Input from "./Input";

export default function InputText<T>(props: InputProps<T>) {
  return (
    <Input {...props}>
      <input
        id={props?.id}
        className={`p-1 rounded outline-none mt-0 shadow text-black ${props.className}`}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        type={props?.type ?? "text"}
        aria-invalid={!!props.error}
        {...(props?.register &&
          props.register(props.registerName, {
            required: props.required,
            pattern: props.pattern,
            minLength: props.minLength,
            min: props.min,
            maxLength: props.maxLength,
            max: props.max,
            validate: props.validate,
          }))}
      />
    </Input>
  );
}
