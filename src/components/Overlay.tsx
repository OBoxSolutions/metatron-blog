export default function Overlay({ className }: { className?: string }) {
  return (
    <span className={`inset-0 bg-gray-800 opacity-75 ${className}`}></span>
  );
}
