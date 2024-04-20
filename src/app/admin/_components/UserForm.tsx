import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import InputText from "@/components/InputText";
import { RegisterUserInputs, User } from "@/types/User";

type UserFormProps = {
  user: User;
  loading?: boolean;
  onSubmit: SubmitHandler<RegisterUserInputs>;
};

export default function UserForm(props: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInputs>({
    defaultValues: {
      ...props.user,
    },
  });

  return (
    <Card>
      <CardBody>
        <p className="text-2xl mb-8">Update user</p>
        <form
          onSubmit={handleSubmit(props.onSubmit)}
          className="flex flex-col gap-4"
        >
          <InputText
            label="Name"
            type="name"
            required="The name is required"
            registerName="name"
            register={register}
            error={errors.name}
          ></InputText>
          <InputText
            label="Email"
            type="email"
            registerName="email"
            required="The email is required"
            pattern={{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            }}
            register={register}
            error={errors.email}
          ></InputText>
          <InputText
            label="Password"
            type="password"
            registerName="password"
            required="The password is required"
            register={register}
            error={errors.password}
            minLength={{
              value: 8,
              message: "Password must be at least 8 characters",
            }}
          ></InputText>
          <div className="flex justify-end mt-4">
            <Button loading={props.loading}>Submit</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
