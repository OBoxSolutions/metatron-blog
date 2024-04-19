import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import InputText from "@/components/InputText";
import { User } from "@/types/User";
import { FormEvent } from "react";

type UserFormProps = {
  user: User;
  loading?: boolean;
  onSubmit: (e: FormEvent) => void;
};
export default function UserForm(props: UserFormProps) {
  const user = { ...props.user };

  return (
    <Card>
      <CardBody>
        <p className="text-2xl mb-8">Update user</p>
        <form onSubmit={props.onSubmit} className="flex flex-col gap-4">
          <InputText
            required={true}
            defaultValue={user.name}
            label="Name"
          ></InputText>
          <InputText
            required={true}
            defaultValue={user.email}
            label="Email"
          ></InputText>
          <div className="flex justify-end mt-4">
            <Button loading={props.loading}>Submit</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
