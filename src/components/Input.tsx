import { InputProps } from "./InputTypes";

export default function Input<T>(props: InputProps<T>) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      {props.label && (
        <label htmlFor={props.label} className="text-white">
          {props.label}
        </label>
      )}
      {props.children}
      {props?.error?.message && (
        <p role="alert" className="text-red-400">
          {props.error.message}
        </p>
      )}
    </div>
  );
}
