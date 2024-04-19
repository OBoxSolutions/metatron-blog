"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import DialogDeleteConfirmation from "@/components/DialogDeleteConfirmation";
import Dialog from "@/components/Dialog";

import Section from "../_components/Section";
import DataTable from "../_components/DataTable";
import CommentForm from "../_components/CommentForm";

import { Comment } from "@/types/Comment";

import { destroy, index, update } from "@/services/comments";

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
  const [formLoading, setFormLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [formDialog, setFormDialog] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    setLoading(true);

    setComments(await index());

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

  const destroyComment = async () => {
    setLoading(true);

    await destroy(String(selectedRows[0].id));
    loadComments();

    setDeleteDialog(false);
  };

  const edit = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    await update({
      id: String(selectedRows[0].id),
      text: formData.get("text") as string,
    });
    loadComments();

    toast.success("Comment updated");
    setFormLoading(false);
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
        <CommentForm
          comment={selectedRows[0]}
          onSubmit={edit}
          loading={formLoading}
        ></CommentForm>
      </Dialog>

      <DialogDeleteConfirmation
        dialog={deleteDialog}
        closeDialog={setDeleteDialog}
        onClickAccept={destroyComment}
        onClickCancel={() => setDeleteDialog(false)}
      ></DialogDeleteConfirmation>
    </Section>
  );
}
