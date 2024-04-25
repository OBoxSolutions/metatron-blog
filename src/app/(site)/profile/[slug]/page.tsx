"use client";

import Button from "@/components/Button";
import DialogDeleteConfirmation from "@/components/DialogDeleteConfirmation";
import { destroy } from "@/services/comments";
import useAuthStore from "@/stores/auth/auth.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const userName = useAuthStore((state) => state.name);
  const userImage = useAuthStore((state) => state.image);
  const userEmail = useAuthStore((state) => state.email);
  const userId = useAuthStore((state) => state.uid);
  const userLogged =useAuthStore((state)=>state.logged)
  const resetStorage = useAuthStore(state=>state.logout)
  
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    if(!userLogged){
      router.push('/')
    }
      
  }, [userLogged])
  

  const onDestroyUser = async () => {
    try {
      setLoading(true);
      if (userId !== null) {
        console.log("Salio bien todo")
        await destroy(userId);
        resetStorage()
      }
    } catch (error) {
      setLoading(false);
      console.error("Error de firebase");
    }
  };

  return (
    <section className="flex flex-col justify-center items-center md:flex-row md:gap-5 md:h-screen">
      <article>
        <h2 className="text-4xl antialiased text-center mt-4">Profile</h2>
        <article>
          <Image
            className="hover:opacity-75 cursor-pointer"
            height={200}
            width={200}
            src={``}
            alt="User Picture"
          />
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
          <Button className="mr-4 bg-blue-600 hover:opacity-75">Edit</Button>
          <Button onClick={()=>setDeleteDialog(true)} className="bg-red-600  hover:opacity-75">
            Delete account
          </Button>

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
