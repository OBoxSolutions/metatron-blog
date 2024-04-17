"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mdiPlus } from "@mdi/js";
import { toast } from "sonner";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Button from "@/components/Button";
import DialogDeleteConfirmation from "@/components/DialogDeleteConfirmation";

import Section from "../_components/Section";
import DataTable from "../_components/DataTable";

import { destroy, index } from "@/services/posts";

import { Post } from "@/types/Post";

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

    const posts = await index();
    setPosts(posts);

    setLoading(false);
  };

  const openConfirmationDialog = () => {
    if (!selectedRows[0]) {
      toast.info("You need to select an item before deleting it");
      return;
    }

    setDialog(true);
  };

  const deletePost = async () => {
    setLoading(true);

    await destroy(`${selectedRows[0].id}`);

    setDialog(false);
    loadPosts();
  };

  const edit = () => {
    if (!selectedRows[0]) {
      toast.info("You need to select an item before updating it");
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
        floating={true}
        href="new-post"
        className="bottom-20 right-20"
      ></Button>

      <DialogDeleteConfirmation
        dialog={dialog}
        closeDialog={setDialog}
        onClickAccept={deletePost}
        onClickCancel={() => setDialog(false)}
      ></DialogDeleteConfirmation>
    </Section>
  );
}
