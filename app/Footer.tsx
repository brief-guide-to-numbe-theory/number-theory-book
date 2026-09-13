import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <Link className="brand" href="/">
        <Image src="/logo.png" alt="ABGNT logo" width={28} height={28} className="brand-mark-img" />
        <span>ABGNT</span>
      </Link>
      <p>A Brief Guide to Number Theory</p>
      <a href="#top">Back to top &uarr;</a>
    </footer>
  );
}
