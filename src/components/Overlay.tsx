type OverlayProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function Overlay(props: OverlayProps) {
  return (
    <span className={`inset-0 bg-gray-800 opacity-75 ${props.className}`}>
      {props.children}
    </span>
  );
}
