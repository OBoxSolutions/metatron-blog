import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return <div className="bg-primary">{children}</div>;
}
