import { mdiMagnify } from "@mdi/js";
import InputText from "./InputText";
import Button from "./Button";
import { FormEvent } from "react";

type SearchBarProps = {
  className?: string;
  defaultValue?: string;
  onSubmit?: (e: any) => void;
};

export default function SearchBar({
  className,
  onSubmit,
  defaultValue,
}: SearchBarProps) {
  const submitWithSearchText = (e: FormEvent) => {
    e.preventDefault();

    if (!onSubmit) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const searchText = formData.get("search") as string;

    if (!searchText) return;
    onSubmit({ searchText });

    onSubmit(searchText);
  };

  return (
    <form
      className={`relative ${className} pt-0`}
      onSubmit={submitWithSearchText}
    >
      <InputText
        className="rounded-full py-3"
        name="search"
        defaultValue={defaultValue}
      ></InputText>
      <span className="absolute right-1 top-4">
        <Button icon={mdiMagnify} iconSize={1} iconPadding="p-3"></Button>
      </span>
    </form>
  );
}
