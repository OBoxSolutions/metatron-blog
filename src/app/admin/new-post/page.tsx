"use client";

import { FormEvent, useState } from "react";
import { addDoc } from "firebase/firestore";

import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Button from "@/components/Button";

import Section from "../_components/Section";

import { postsCollection } from "@/utils/firebase";

export default function NewPost() {
  const [isLoading, setLoading] = useState(false);

  const addPost = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    if (!target.checkValidity()) return;

    const formData = new FormData(target);

    const data = {
      date: new Date().getUTCDate(),
      userId: 1,
      title: formData.get("title"),
      description: formData.get("description"),
      image: "",
      isFeatured: false,
      content: formData.get("content"),
    };

    await addDoc(postsCollection, data);
    setLoading(false);
  };

  return (
    <Section title="Add Posts">
      <Card>
        <CardBody>
          {isLoading && <p>Loading baby</p>}

          <form className="flex flex-col gap-4" onSubmit={addPost}>
            <InputText label="Title" required={true}></InputText>
            <TextArea label="Description" required={true}></TextArea>
            <TextArea label="Content" required={true}></TextArea>
            <Button className="ml-auto">Submit</Button>
          </form>
        </CardBody>
      </Card>
    </Section>
  );
}
