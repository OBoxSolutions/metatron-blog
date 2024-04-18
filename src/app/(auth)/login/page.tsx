"use client";

import { FormEvent } from "react";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Link from "next/link";

function RegisterForm() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  };

  return (
    <div>
      <Card>
        <CardBody>
          <form className="flex flex-col gap-5 mb-0" onSubmit={onSubmit}>
            <InputText label="Email" type="email" required={true}></InputText>
            <InputText
              label="Password"
              type="password"
              required={true}
            ></InputText>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-accent"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Login</Button>
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

export default RegisterForm;
