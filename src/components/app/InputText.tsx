import { InputProps } from "./Input";

export default function TextInput(props: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.label}>{props.label}</label>
      <input
        id={props.label}
        required={props.required}
        v-model="text"
        className="p-1 rounded outline-none mt-0 shadow shadow--press"
      />
    </div>
  );
}
