"use client";

import { FormEvent, useEffect, useState } from "react";
import { deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import DialogDeleteConfirmation from "@/components/DialogDeleteConfirmation";
import Dialog from "@/components/Dialog";

import Section from "../_components/Section";
import DataTable from "../_components/DataTable";
import UserForm from "../_components/UserForm";

import { User } from "@/types/User";

import { db, commentsCollection } from "@/utils/firebase";

const columns = [
  {
    name: "Name",
    selector: (row: User) => row.name,
  },
  {
    email: "Email",
    selector: (row: User) => row.email,
  },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [formDialog, setFormDialog] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);

    const querySnapshot = await getDocs(commentsCollection);
    setUsers(
      querySnapshot.docs.map((doc) => ({
        ...(doc.data() as User),
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

    const docRef = doc(db, "users", String(selectedRows[0].id));

    await deleteDoc(docRef);
    setDeleteDialog(false);
    loadUsers();
  };

  const edit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const docRef = doc(db, "users", String(selectedRows[0].id));
    updateDoc(docRef, {
      text: formData.get("text") as string,
    });

    toast.success("User updated");
    loadUsers();
    setFormDialog(false);
  };

  return (
    <Section title="Users">
      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            data={users}
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
        <UserForm user={selectedRows[0]} onSubmit={edit}></UserForm>
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
