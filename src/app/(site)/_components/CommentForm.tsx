import { FormEvent } from "react";

import { addDoc } from "firebase/firestore";

import { postsCollection } from "@/utils/firebase";

import Button from "@/components/Button";
import TextArea from "@/components/TextArea";

type CommentFormProps = {
  className: string;
};

export default function CommentForm(props: CommentFormProps) {
  const submit = (e: FormEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      text: formData.get("text") as string,
    };

    addDoc(postsCollection, data);
  };

  return (
    <div className={props.className}>
      <h3 className="text-2xl">Comments</h3>
      <form className="mt-2">
        <TextArea required={true}></TextArea>
        <div className="flex justify-end mt-4">
          <Button onClick={submit}>Send</Button>
        </div>
      </form>
    </div>
  );
}
