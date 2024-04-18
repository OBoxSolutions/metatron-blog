"use client";

import { FormEvent } from "react";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import CardBody from "@/components/CardBody";
import Card from "@/components/Card";
import Link from "next/link";

function RegisterForm() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
    }
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
            <InputText
              label="Confirm Password"
              type="password"
              required={true}
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
