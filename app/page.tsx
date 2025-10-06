import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Image
        src="./game.svg"
        alt="main game prototype image"
        width={1000}
        height={1441}
        className="place-self-center-safe pointer-events-none"
        priority
      />
      <Footer>
        <Link href="/game">/game</Link>
      </Footer>
    </>
  );
}
