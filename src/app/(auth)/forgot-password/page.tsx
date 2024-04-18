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

    const password = formData.get("password") as string;
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

          <form className="flex flex-col gap-5 mb-0" onSubmit={onSubmit}>
            <InputText label="Email" type="email" required={true}></InputText>
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
