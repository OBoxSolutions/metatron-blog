"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { mdiPlus } from "@mdi/js";
import { toast } from "sonner";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import Button from "@/components/Button";
import DialogDeleteConfirmation from "@/components/DialogDeleteConfirmation";

import Section from "../_components/Section";
import DataTable from "../_components/DataTable";

import { Comment } from "@/types/Comment";

import { db, commentsCollection } from "@/utils/firebase";
import Dialog from "@/components/Dialog";
import CommentForm from "../_components/CommentForm";

const columns = [
  {
    name: "Text",
    selector: (row: Comment) => row.text,
  },
];

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedRows, setSelectedRows] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    setLoading(true);
    const localComments: Comment[] = [];

    const querySnapshot = await getDocs(commentsCollection);
    querySnapshot.forEach((doc) => {
      const comment = doc.data() as Comment;
      localComments.push({ ...comment, id: doc.id });
    });

    setComments(localComments);
    setLoading(false);
  };

  const openConfirmationDialog = () => {
    if (!selectedRows[0]) {
      toast.info("You need to select an item before deleting it");
      return;
    }

    setDeleteDialog(true);
  };

  const openEditDialog = () => {
    if (!selectedRows[0]) {
      toast.info("You need to select an item before updating it");
      return;
    }

    setEditDialog(true);
  };

  const destroy = async () => {
    setLoading(true);

    const docRef = doc(db, "comments", String(selectedRows[0].id));

    await deleteDoc(docRef);
    setDeleteDialog(false);
    loadComments();
  };

  const edit = () => {};

  return (
    <Section title="Comments">
      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            data={comments}
            onSelectedRowsChange={({ selectedRows }) =>
              setSelectedRows(selectedRows)
            }
            onDestroy={openConfirmationDialog}
            onUpdate={openEditDialog}
            progressPending={loading}
          />
        </CardBody>
      </Card>
      <Button
        icon={mdiPlus}
        iconSize={2}
        href="new-comment"
        className="fixed bottom-20 right-20"
      ></Button>

      <Dialog dialog={editDialog} closeDialog={setEditDialog}>
        <CommentForm comment={selectedRows[0]} onSubmit={edit}></CommentForm>
      </Dialog>

      <DialogDeleteConfirmation
        dialog={deleteDialog}
        closeDialog={setDeleteDialog}
        onClickAccept={destroy}
        onClickCancel={() => setDeleteDialog(false)}
      ></DialogDeleteConfirmation>
    </Section>
  );
}
