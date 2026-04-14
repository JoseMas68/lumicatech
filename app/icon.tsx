import Image from "next/image";

export default function Icon() {
  return (
    <Image
      src="/icon.png"
      alt="LumicaTech Logo"
      width={512}
      height={512}
      priority
    />
  );
}