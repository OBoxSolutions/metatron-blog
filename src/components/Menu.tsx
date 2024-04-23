import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Card from "./Card";
import CardBody from "./CardBody";

export type MenuProps = {
  menu: boolean;
  setMenu: (menu: boolean) => void;
  anchorEl: HTMLElement;
  width?: string;
  children?: React.ReactNode;
};

export default function Menu({
  menu,
  setMenu,
  anchorEl,
  width = "300px",
  children,
}: MenuProps) {
  const menuContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEvent(event: MouseEvent) {
      if (!menuContentRef?.current?.contains(event.target as Node)) {
        setMenu(false);
      }
    }

    function handleKeyboardEvent(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (!menuContentRef?.current?.contains(event.target as Node)) {
        setMenu(false);
      }
    }

    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("keydown", handleKeyboardEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("keydown", handleKeyboardEvent);
    };
  }, [menu, setMenu, menuContentRef]);

  if (!menu) return null;

  return createPortal(
    <div className="absolute right-0" style={{ width }} ref={menuContentRef}>
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>,
    anchorEl,
  );
}
