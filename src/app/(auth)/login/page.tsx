"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import useAuthStore from "@/stores/auth/auth.store";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Link from "next/link";
import Swal from "sweetalert2";

type LoginInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const loginUser = useAuthStore((state) => state.login);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const { ok, msg } = await loginUser(data.email, data.password);
      if (!ok) {
        Swal.fire({
          title: msg,
          icon: "error",
          width: 600,
          padding: "3em",
          color: "#F27474",
        });
        reset();
      } else {
        console.log("logeado");
        reset();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
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
              required="The email is required"
              registerName="email"
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
              minLength={{
                value: 8,
                message: "Password must be at least 8 characters",
              }}
              register={register}
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
