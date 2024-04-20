import { InputProps } from "./InputTypes";
import Input from "./Input";
import { MouseEvent } from "react";

export default function InputFile<T>(props: InputProps<T>) {
  const triggerInputFile = (e: MouseEvent) => {
    const element = (e?.target as HTMLElement)?.children[0] as
      | HTMLElement
      | undefined;

    if (element) element.click();
  };

  return (
    <Input {...props}>
      <span
        onClick={triggerInputFile}
        className="p-1 rounded outline-none mt-0 shadow text-black bg-white cursor-pointer"
      >
        <input
          id={props?.id}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          className="invisible"
          type="file"
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
      </span>
    </Input>
  );
}
