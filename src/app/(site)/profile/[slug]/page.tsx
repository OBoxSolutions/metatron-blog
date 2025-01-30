"use client";

import Button from "@/components/Button";
import DialogDeleteConfirmation from "@/components/DialogDeleteConfirmation";
import { destroy } from "@/services/comments";
import useAuthStore from "@/stores/auth/auth.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserImagePlaceholder from "../../../../components/UserImagePlaceholder";
import Dialog from "@/components/Dialog";
import UserForm from "@/app/admin/_components/UserForm";
import { SubmitHandler } from "react-hook-form";
import { RegisterUserInputs, User } from "@/types/User";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/utils/firebase.browser";
import { toast } from "sonner";
import { update } from "@/services/users";

export default function Page() {
  const userName = useAuthStore((state) => state.name);
  const userImage = useAuthStore((state) => state.image);
  const userEmail = useAuthStore((state) => state.email);
  const userId = useAuthStore((state) => state.uid);
  const userLogged = useAuthStore((state) => state.logged);
  const resetStorage = useAuthStore((state) => state.logout);
  const editUser = useAuthStore((state) => state.updateUser);
  const user = {
    name: userName ?? "",
    image: userImage ?? "",
    email: userEmail ?? "",
  };

  const router = useRouter();

  const [_, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [formDialog, setFormDialog] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [isFormUpdating, setIsFormUpdating] = useState(false);

  useEffect(() => {
    if (!userLogged) {
      router.push("/");
    }
  }, [userLogged]);

  const onDestroyUser = async () => {
    try {
      setLoading(true);
      if (userId !== null) {
        await destroy(userId);
        resetStorage();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error de firebase");
    }
  };

  const submit: SubmitHandler<RegisterUserInputs> = async (data) => {
    setFormLoading(true);

    const profileImageRef = ref(storage, `users/${data.name}_${userId}`);

    try {
      // Subimos imagen a FireStore
      if (data.image) {
        await uploadBytes(profileImageRef, data.image[0]);
      }

      const profileImageDownloadUrl = await getDownloadURL(profileImageRef);

      if (isFormUpdating) {
        await updateUser({
          ...data,
          image: profileImageDownloadUrl,
          id: userId ?? undefined,
        });
      }
    } catch (error) {
      toast.error("Problem adding user");
      console.log((error as Error).message);
    }
    setFormLoading(false);
  };

  const updateUser = async (user: User) => {
    const docRef = await update(user);

    if (docRef) {
      toast.success("User updated");
      setFormDialog(false);
      editUser(user);
    }
  };

  const openEditDialog = () => {
    setIsFormUpdating(true);
    setFormDialog(true);
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen md:flex-row md:gap-5">
      <article className="flex flex-col justify-center items-center">
        <h2 className="text-4xl antialiased text-center mt-4">Profile</h2>
        <article>
          {userImage !== "" ? (
            <Image
              className={
                "object-cover w-52 h-52 mt-2 rounded-full shadow-md border-4 border-gray-300"
              }
              height={200}
              width={200}
              src={userImage ?? ""}
              alt={userName ?? "user"}
            />
          ) : (
            <UserImagePlaceholder className="w-52 h-52 mt-2" size={"full"} />
          )}
        </article>
      </article>

      <article className="flex flex-col justify-center items-center">
        <h2 className="text-3xl text-center mt-2">Datos</h2>
        <article className=" bg-gray-400 mt-2  p-9 rounded-md shadow-sm justify-center items-center">
          <p className="flex gap-2">
            Name: <span>{userName}</span>
          </p>
          <p className="flex gap-3">
            Email: <span>{userEmail}</span>
          </p>
        </article>
      </article>
      <article className="mb-4">
        <h2 className="text-3xl text-center mt-2">Actions</h2>
        <article className="mt-4 justify-center items-center">
          <Button
            onClick={openEditDialog}
            className="mr-4 bg-blue-600 hover:opacity-75"
          >
            Edit
          </Button>
          <Button
            onClick={() => setDeleteDialog(true)}
            className="bg-red-600  hover:opacity-75"
          >
            Delete account
          </Button>

          <Dialog dialog={formDialog} closeDialog={setFormDialog} width="500px">
            <UserForm
              user={user}
              onSubmit={submit}
              loading={formLoading}
              changePassword={false}
            ></UserForm>
          </Dialog>

          <DialogDeleteConfirmation
            dialog={deleteDialog}
            closeDialog={setDeleteDialog}
            onClickAccept={onDestroyUser}
            onClickCancel={() => setDeleteDialog(false)}
            alert="Are you sure??!"
          ></DialogDeleteConfirmation>
        </article>
      </article>
    </section>
  );
}
