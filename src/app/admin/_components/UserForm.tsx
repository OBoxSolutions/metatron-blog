import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import InputText from "@/components/InputText";
import ImageUpload from "@/components/ImageUpload";
import { RegisterUserInputs, User } from "@/types/User";

type UserFormProps = {
  user: User;
  loading?: boolean;
  image?: File;
  onSubmit: SubmitHandler<RegisterUserInputs>;
  changePassword?: boolean;
};

export default function UserForm(props: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInputs>();

  return (
    <Card>
      <CardBody>
        <p className="text-2xl mb-8">Update user</p>
        <form
          onSubmit={handleSubmit(props.onSubmit)}
          className="flex flex-col gap-4"
        >
          <ImageUpload
            label="Image"
            required="The image is required"
            registerName="image"
            src={props.user.image}
            register={register}
            error={errors.image}
          ></ImageUpload>
          <InputText
            label="Name"
            required="The name is required"
            registerName="name"
            register={register}
            defaultValue={props.user.name}
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
            defaultValue={props.user.email}
            error={errors.email}
          ></InputText>
          {props.changePassword === undefined ? (
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
          ) : (
            <></>
          )}
          <div className="flex justify-end mt-4">
            <Button loading={props.loading}>Submit</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
