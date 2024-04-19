"use client";

import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import CardBody from "@/components/CardBody";
import Card from "@/components/Card";

type RegisterInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <form
            noValidate
            className="flex flex-col gap-5 mb-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              label="Name"
              type="name"
              required="The name is required"
              register={register}
              error={errors.name}
            ></InputText>
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
            <InputText
              label="Password"
              type="password"
              required="The password is required"
              register={register}
              error={errors.password}
              minLength={{
                value: 8,
                message: "Password must be at least 8 characters",
              }}
            ></InputText>
            <InputText
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required="The confirm password is required"
              validate={(value: string) =>
                value === getValues("password")[0] || "Passwords do not match"
              }
              register={register}
              error={errors.confirmPassword}
            ></InputText>
            <div className="flex justify-end">
              <Button>Register</Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <div className="flex justify-center mt-4">
        <p className="text-white">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
