import { mdiMagnify } from "@mdi/js";
import InputText from "./InputText";
import Button from "./Button";

export default function SearchBar({ className }: { className: string }) {
  return (
    <form className={`relative ${className} pt-0`}>
      <InputText className="rounded-full py-3 pl-7"></InputText>
      <span className="absolute right-1 top-4">
        <Button icon={mdiMagnify} iconSize={1} iconPadding="p-3"></Button>
      </span>
    </form>
  );
}
