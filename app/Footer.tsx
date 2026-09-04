import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <Link className="brand" href="/">
        <span className="brand-mark">&sum;</span>
        <span>ABGNT</span>
      </Link>
      <p>A brief guide to Number Theory</p>
      <a href="#top">Back to top &uarr;</a>
    </footer>
  );
}
