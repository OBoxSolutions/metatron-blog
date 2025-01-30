"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { mdiPlus } from "@mdi/js";
import { ref as fireRef, getDownloadURL, uploadBytes } from "firebase/storage";

import { storage } from "@/utils/firebase.browser";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import DialogDeleteConfirmation from "@/components/DialogDeleteConfirmation";
import Dialog from "@/components/Dialog";
import Button from "@/components/Button";
import UserImagePlaceholder from "@/components/UserImagePlaceholder";

import Section from "../_components/Section";
import DataTable from "../_components/DataTable";
import UserForm from "../_components/UserForm";

import { RegisterUserInputs, User } from "@/types/User";

import { index, destroy, store, update } from "@/services/users";
import { SubmitHandler } from "react-hook-form";

const columns = [
  {
    name: "User",
    selector: (row: User) => (
      <div className="flex gap-5 items-center my-2">
        {row.image ? (
          <img
            src={row.image}
            alt="User profile pic"
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <UserImagePlaceholder />
        )}
        <span>{row.name}</span>
      </div>
    ),
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
  const [formLoading, setFormLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [formDialog, setFormDialog] = useState(false);
  const [isFormUpdating, setIsFormUpdating] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);

    setUsers(await index());

    setLoading(false);
  };

  const openConfirmationDialog = () => {
    if (!selectedRows[0]) {
      toast.info("You need to select an item before deleting it");
      return;
    }

    setDeleteDialog(true);
  };

  const openAddDialog = () => {
    setIsFormUpdating(false);
    setFormDialog(true);
  };

  const openEditDialog = () => {
    if (!selectedRows[0]) {
      toast.info("You need to select an item before updating it");
      return;
    }

    setIsFormUpdating(true);
    setFormDialog(true);
  };

  const destroyUser = async () => {
    if (!selectedRows[0]) {
      toast.info("You need to select an item before deleting it");
      return;
    }

    setLoading(true);

    await destroy(selectedRows[0].id as string);

    setDeleteDialog(false);
    loadUsers();
  };

  const submit: SubmitHandler<RegisterUserInputs> = async (data) => {
    setFormLoading(true);

    const profileImageRef = fireRef(storage, `users/${data.name}`);

    try {
      if (!data.image) return;

      await uploadBytes(profileImageRef, data.image[0]);
      const profileImageDownloadUrl = await getDownloadURL(profileImageRef);

      isFormUpdating
        ? await updateUser({
            ...data,
            image: profileImageDownloadUrl,
            id: selectedRows[0].id,
          })
        : await storeUser({ ...data, image: profileImageDownloadUrl });

      loadUsers();
    } catch (error) {
      toast.error("Problem adding user");
      console.log((error as Error).message);
    }
    setFormLoading(false);
  };

  const storeUser = async (user: User) => {
    await store(user);
    toast.success("User inserted successfully");
    setFormDialog(false);
  };

  const updateUser = async (user: User) => {
    await update(user);

    toast.success("User updated");
    loadUsers();
    setFormDialog(false);
  };

  return (
    <Section title="Users">
      <Card>
        <CardBody>
          <DataTable
            columns={columns as any}
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

      <Button
        icon={mdiPlus}
        iconSize={2}
        floating={true}
        onClick={openAddDialog}
        className="bottom-20 right-20"
      ></Button>

      <Dialog dialog={formDialog} closeDialog={setFormDialog} width="500px">
        <UserForm
          user={isFormUpdating ? selectedRows[0] : ({} as User)}
          onSubmit={submit}
          loading={formLoading}
        ></UserForm>
      </Dialog>

      <DialogDeleteConfirmation
        dialog={deleteDialog}
        closeDialog={setDeleteDialog}
        onClickAccept={destroyUser}
        onClickCancel={() => setDeleteDialog(false)}
      ></DialogDeleteConfirmation>
    </Section>
  );
}
