"use client";

import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";

import Section from "../_components/Section";

import DataTable from "../_components/DataTable";

import { Post } from "@/types/Post";

import posts from "@/app/_posts";

const columns = [
  {
    name: "Title",
    selector: (row: Post) => row.title,
  },
  {
    name: "Year",
    selector: (row: Post) => row.date,
  },
  {
    name: "Featured",
    selector: (row: Post) => (row.isFeatured ? "Yes" : "No"),
  },
  {
    name: "Description",
    selector: (row: Post) => row.description,
  },
];

export default function Posts() {
  return (
    <Section title="Posts">
      <Card>
        <CardBody>
          <DataTable columns={columns} data={posts} />
        </CardBody>
      </Card>
      <button className="fixed bottom-10 right-10 rounded-full p-4 bg-accent">
        <Icon path={mdiPlus} size={2}></Icon>
      </button>
    </Section>
  );
}
