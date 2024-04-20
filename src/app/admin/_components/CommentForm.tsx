import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import TextArea from "@/components/TextArea";

import { Comment, CommentInput } from "@/types/Comment";

type CommentFormProps = {
  comment: Comment;
  loading?: boolean;
  onSubmit: SubmitHandler<CommentInput>;
};

export default function CommentForm(props: CommentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentInput>({
    defaultValues: {
      ...props.comment,
    },
  });

  return (
    <Card>
      <CardBody>
        <p className="text-2xl mb-8">Update comment</p>
        <form onSubmit={handleSubmit(props.onSubmit)}>
          <TextArea
            label="Text"
            required="The comment is required"
            registerName="text"
            register={register}
            error={errors.text}
          ></TextArea>
          <div className="flex justify-end mt-4">
            <Button loading={props.loading}>Submit</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
