import { FormEvent } from "react";

import Button from "@/components/Button";
import TextArea from "@/components/TextArea";

type CommentFormProps = {
  className?: string;
  loading: boolean;
  onSubmit: (e: FormEvent) => void;
};

export default function CommentForm(props: CommentFormProps) {
  return (
    <form className={props.className} onSubmit={props.onSubmit}>
      <TextArea required={true} disabled={props.loading}></TextArea>
      <div className="flex justify-end mt-4">
        <Button loading={props.loading}>Send</Button>
      </div>
    </form>
  );
}
