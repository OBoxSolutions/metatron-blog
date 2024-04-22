import { InputProps } from "./InputTypes";
import Input from "./Input";
import { MouseEvent, useRef } from "react";
import { mdiUploadBoxOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function ImageUpload<T>(props: InputProps<T>) {
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerInputFile = () => {
    if (!inputRef?.current) return;

    inputRef.current.click();
  };

  const setImage = (e: MouseEvent) => {
    const element = e?.target as HTMLInputElement;

    if (!element?.files) return;

    const file = element.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      if (!imgRef?.current?.src) return;

      imgRef.current.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  return (
    <Input {...props}>
      <span
        className="cursor-pointer relative h-40 w-full border border-accent flex justify-center"
        onClick={triggerInputFile}
      >
        <span className="absolute inset-0 flex justify-center items-center bg-transparent z-20">
          <span className="rounded-full bg-primary p-2">
            <Icon
              path={mdiUploadBoxOutline}
              size={2}
              className="text-accent"
            ></Icon>
          </span>
        </span>
        <span className="absolute inset-0 flex justify-center items-center bg-primary opacity-50"></span>
        <img src="" alt="" className="w-auto h-full" ref={imgRef} />
        <input
          id={props?.id}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          className="invisible absolute"
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
          ref={inputRef}
          onChange={setImage}
        />
      </span>
    </Input>
  );
}
