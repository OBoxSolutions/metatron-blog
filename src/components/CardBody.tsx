import { ReactNode } from "react";

export type CardBodyProps = {
  children: ReactNode;
  className?: string;
};

export default function CardBody({ children, className }: CardBodyProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
