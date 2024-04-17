"use client";

import { FormEvent, useEffect, useState } from "react";
import { deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
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
  const [formDialog, setFormDialog] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    setLoading(true);

    const querySnapshot = await getDocs(commentsCollection);
    setComments(
      querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Comment),
        id: doc.id,
      })),
    );
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

    setFormDialog(true);
  };

  const destroy = async () => {
    setLoading(true);

    const docRef = doc(db, "comments", String(selectedRows[0].id));

    await deleteDoc(docRef);
    setDeleteDialog(false);
    loadComments();
  };

  const edit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const docRef = doc(db, "comments", String(selectedRows[0].id));
    updateDoc(docRef, {
      text: formData.get("text") as string,
    });

    toast.success("Comment updated");
    loadComments();
    setFormDialog(false);
  };

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

      <Dialog dialog={formDialog} closeDialog={setFormDialog} width="500px">
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
