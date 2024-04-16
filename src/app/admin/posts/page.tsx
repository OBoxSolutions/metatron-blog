"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { mdiPlus } from "@mdi/js";
import { toast } from "sonner";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Button from "@/components/Button";

import Section from "../_components/Section";
import DataTable from "../_components/DataTable";

import { Post } from "@/types/Post";

import { db, postsCollection } from "@/utils/firebase";
import DialogDeleteConfirmation from "@/components/DialogDeleteConfirmation";

const columns = [
  {
    name: "Title",
    selector: (row: Post) => row.title,
  },
  {
    name: "Date",
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
  const [dialog, setDialog] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const localPosts: Post[] = [];

    const querySnapshot = await getDocs(postsCollection);
    querySnapshot.forEach((doc) => {
      const post = doc.data() as Post;
      localPosts.push({ ...post, id: doc.id });
    });

    setPosts(localPosts);
    setLoading(false);
  };

  const openConfirmationDialog = () => {
    if (!selectedRows[0]) {
      toast.info("Select a post in the table");
      return;
    }

    setDialog(true);
  };

  const destroy = async () => {
    setLoading(true);

    const docRef = doc(db, "posts", String(selectedRows[0].id));

    await deleteDoc(docRef);
    setDialog(false);
    loadPosts();
  };

  const edit = () => {
    if (!selectedRows[0]) {
      toast.info("Select a post in the table");
      return;
    }

    router.push(`/admin/new-post/${selectedRows[0].id}`);
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
            onDestroy={openConfirmationDialog}
            onUpdate={edit}
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

      <DialogDeleteConfirmation
        dialog={dialog}
        closeDialog={setDialog}
        onClickAccept={destroy}
        onClickCancel={() => setDialog(false)}
      ></DialogDeleteConfirmation>
    </Section>
  );
}
