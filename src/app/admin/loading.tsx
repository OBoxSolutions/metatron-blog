import LoadingIndicator from "@/components/LoadingIndicator";
import Overlay from "@/components/Overlay";

export default function Loading() {
  return (
    <Overlay className="absolute">
      <LoadingIndicator iconSize={3} className="m-auto" />
    </Overlay>
  );
}
