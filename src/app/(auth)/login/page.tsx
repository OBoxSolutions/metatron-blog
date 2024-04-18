"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";

import Link from "next/link";

type LoginInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <form
            className="flex flex-col gap-5 mb-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              label="Email"
              type="email"
              register={register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email}
            ></InputText>
            <InputText
              label="Password"
              type="password"
              register={register("password", { required: true, minLength: 8 })}
              error={errors.password}
            ></InputText>
            <div className="flex items-center">
              <Link
                href="/forgot-password"
                className="font-medium text-accent text-sm"
              >
                Forgot your password?
              </Link>
              <Button className="ml-auto">Login</Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <div className="flex justify-center mt-4">
        <p className="text-white">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-accent">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
