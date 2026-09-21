import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <Link className="brand" href="/">
        <span className="brand-mark">
          <Image src="/logo.png" alt="ABGNT logo" width={18} height={24} style={{ objectFit: "contain" }} />
        </span>
        <span>ABGNT</span>
      </Link>
      <div className="footer-info">
        <p>A Brief Guide to Number Theory</p>
        <a href="mailto:abgnt.official@gmail.com" className="footer-contact">
          abgnt.official@gmail.com
        </a>
      </div>
      <a href="#top">Back to top &uarr;</a>
    </footer>
  );
}
