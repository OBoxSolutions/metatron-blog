import { InputProps } from "./InputTypes";
import Input from "./Input";

export default function TextArea<T>(props: InputProps<T>) {
  return (
    <Input {...props}>
      <textarea
        id={props?.id}
        className="p-1 rounded outline-none mt-0 shadow text-black"
        disabled={props.disabled}
        defaultValue={props.defaultValue}
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
