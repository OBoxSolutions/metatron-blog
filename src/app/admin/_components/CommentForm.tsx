import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { Comment } from "@/types/Comment";

type CommentFormProps = {
  comment: Comment;
  onSubmit: (comment: Comment) => void;
};
export default function CommentForm(props: CommentFormProps) {
  const comment = { ...props.comment };

  return (
    <form>
      <InputText required={true}></InputText>
      <div className="flex justify-end">
        <Button onClick={(_) => props.onSubmit(comment)}>Submit</Button>
      </div>
    </form>
  );
}
