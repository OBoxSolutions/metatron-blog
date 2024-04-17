import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import TextArea from "@/components/TextArea";
import { Comment } from "@/types/Comment";
import { FormEvent } from "react";

type CommentFormProps = {
  comment: Comment;
  onSubmit: (e: FormEvent) => void;
};
export default function CommentForm(props: CommentFormProps) {
  const comment = { ...props.comment };

  return (
    <Card>
      <CardBody>
        <p className="text-2xl mb-8">Update comment</p>
        <form onSubmit={props.onSubmit}>
          <TextArea
            required={true}
            defaultValue={comment.text}
            label="Text"
          ></TextArea>
          <div className="flex justify-end mt-4">
            <Button>Submit</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
