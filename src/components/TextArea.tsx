import { InputProps } from "./Input";

export default function TextArea(props: InputProps) {
  return (
    <div className="flex flex-col">
      {props.label && (
        <label htmlFor={props.label} className="text-white">
          {props.label}
        </label>
      )}
      <textarea
        id={props.label}
        required={props.required}
        value={props.value}
        className="p-1 rounded outline-none mt-0 shadow text-black"
        name={props.name ? props.name : props.label?.toLowerCase()}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
      />
    </div>
  );
}
