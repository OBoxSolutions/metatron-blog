"use client";

import { useEffect, useState } from "react";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { mdiPlus } from "@mdi/js";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Button from "@/components/Button";

import Section from "../_components/Section";
import DataTable from "../_components/DataTable";

import { Post } from "@/types/Post";

import { db, postsCollection } from "@/utils/firebase";

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedRows, setSelectedRows] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const localPosts: Post[] = [];

    const querySnapshot = await getDocs(postsCollection);
    querySnapshot.forEach((doc) => {
      const post = doc.data() as Post;
      localPosts.push(post);
    });

    setPosts(localPosts);
    setLoading(false);
  };

  const destroy = () => {
    if (!selectedRows[0]) return;

    const docRef = doc(db, "posts", String(selectedRows[0].id));
    deleteDoc(docRef);
  };

  return (
    <Section title="Posts">
      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            data={posts}
            onSelectedRowsChange={({ selectedRows }) =>
              setSelectedRows(selectedRows)
            }
            onDestroy={destroy}
            progressPending={loading}
          />
        </CardBody>
      </Card>
      <Button
        icon={mdiPlus}
        iconSize={2}
        href="new-post"
        className="fixed bottom-20 right-20"
      ></Button>
    </Section>
  );
}
