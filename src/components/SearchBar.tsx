import { mdiMagnify } from "@mdi/js";
import InputText from "./InputText";
import Button from "./Button";

type SearchBarProps = {
  className?: string;
  onSubmit?: (e: any) => void;
};

export default function SearchBar({ className, onSubmit }: SearchBarProps) {
  return (
    <form className={`relative ${className} pt-0`} onSubmit={onSubmit}>
      <InputText className="rounded-full py-3 pl-7"></InputText>
      <span className="absolute right-1 top-4">
        <Button icon={mdiMagnify} iconSize={1} iconPadding="p-3"></Button>
      </span>
    </form>
  );
}
