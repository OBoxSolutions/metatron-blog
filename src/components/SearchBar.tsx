import { mdiMagnify } from "@mdi/js";
import InputText from "./InputText";
import Button from "./Button";

export default function SearchBar({ className }: { className: string }) {
  return (
    <div className={className}>
      <InputText className="rounded-full"></InputText>
      <Button icon={mdiMagnify}></Button>
    </div>
  );
}
