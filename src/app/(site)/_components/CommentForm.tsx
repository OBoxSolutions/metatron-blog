import { FormEvent } from "react";

import Button from "@/components/Button";
import TextArea from "@/components/TextArea";

type CommentFormProps = {
  className: string;
  onSubmit: (e: FormEvent) => void;
};

export default function CommentForm(props: CommentFormProps) {
  return (
    <div className={props.className}>
      <h3 className="text-2xl">Comments</h3>
      <form className="mt-2" onSubmit={props.onSubmit}>
        <TextArea required={true} name="text"></TextArea>
        <div className="flex justify-end mt-4">
          <Button>Send</Button>
        </div>
      </form>
    </div>
  );
}
