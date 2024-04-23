import { MouseEvent, useEffect, useRef } from "react";

export type DialogProps = {
  dialog: boolean;
  closeDialog: (dialog: boolean) => void;
  width?: string;
  children?: React.ReactNode;
};

export default function Dialog({
  dialog,
  closeDialog,
  width = "600px",
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    dialog ? dialogRef.current?.showModal() : dialogRef.current?.close();

    const closeDialogHandler = () => {
      closeDialog(false);
    };

    dialogRef.current.addEventListener("close", closeDialogHandler);

    return () => {
      dialogRef.current?.removeEventListener("close", closeDialogHandler);
    };
  }, [dialog, closeDialog, dialogRef]);

  const closeIfClickOutside = (e: MouseEvent<HTMLDialogElement>) => {
    if (dialogRef.current?.children[1].contains(e.target as Node)) {
      closeDialog(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      style={{ width }}
      className="text-white"
      onClick={closeIfClickOutside}
    >
      <div>{children}</div>
      <span className="fixed inset-0 bg-gray-800 opacity-75 -z-10"></span>
    </dialog>
  );
}
