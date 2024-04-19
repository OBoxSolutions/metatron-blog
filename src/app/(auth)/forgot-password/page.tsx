"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Link from "next/link";

type ForgotPasswordInputs = {
  email: string;
  password: string;
};

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <div className="mb-4 text-white">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </div>

          <form
            className="flex flex-col gap-5 mb-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              label="Email"
              type="email"
              required="The email is required"
              pattern={{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              }}
              register={register}
              error={errors.email}
            ></InputText>
            <div className="flex justify-end">
              <Button>Email password reset link</Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <div className="flex justify-center mt-4">
        <Link href="/register" className="font-medium text-accent">
          Go Back to Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
