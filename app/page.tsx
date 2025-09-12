import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/crane.svg" alt="crane" width={180} height={80} priority />
      <p>yo</p>
    </>
  );
}
