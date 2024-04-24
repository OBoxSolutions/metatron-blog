"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import CardBody from "@/components/CardBody";
import Card from "@/components/Card";
import { RegisterUserInputs } from "@/types/User";
import useAuthStore from "@/stores/auth/auth.store";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function RegisterForm() {
  const registerUser = useAuthStore((state) => state.register);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<RegisterUserInputs>();

  const onSubmit: SubmitHandler<RegisterUserInputs> = async (data) => {
    const { name, email, password } = data;

    try {
      const { ok, msg } = await registerUser(name, email, password);

      if (!ok && msg) {
        Swal.fire({
          title: msg,
          icon: "error",
          width: 600,
          padding: "3em",
          color: "#F27474",
        });
        reset();
      } else {
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
              registerName="name"
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
            <InputText
              label="Confirm Password"
              registerName="confirmpassword"
              type="password"
              required="The confirm password is required"
              validate={(value: string) =>
                value === getValues("password") || "Passwords do not match"
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
