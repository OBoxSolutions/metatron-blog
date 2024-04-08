import { ReactNode } from "react";

export default function CardBody({ children }: { children: ReactNode }) {
  return <div className="p-2">{children}</div>;
}
