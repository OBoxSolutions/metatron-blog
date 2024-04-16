import { useEffect, useRef } from "react";

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
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEvent(event: MouseEvent) {
      if (!dialogContentRef?.current?.contains(event.target as Node)) {
        closeDialog(false);
      }
    }

    document.addEventListener("mousedown", handleEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
    };
  }, [dialog, closeDialog, dialogContentRef]);

  if (!dialog) return null;

  return (
    <div className={`fixed inset-0 flex`}>
      <div
        className="h-fit w-fit m-auto z-20"
        style={{ width }}
        ref={dialogContentRef}
      >
        {children}
      </div>
      <div className="fixed inset-0 bg-gray-800 opacity-75 -z-10"></div>
    </div>
  );
}
