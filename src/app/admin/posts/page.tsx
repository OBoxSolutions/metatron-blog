"use client";

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
];

export default function Posts() {
  return (
    <Section title="Posts">
      <Card>
        <CardBody>
          <DataTable columns={columns} data={posts} />
        </CardBody>
      </Card>
    </Section>
  );
}
