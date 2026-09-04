import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Home">
        <span className="brand-mark">&sum;</span>
        <span>ABGNT</span>
      </Link>

      <nav aria-label="Main navigation">
        <Link href="/general">General</Link>
        <Link href="/authors">Authors</Link>
        <Link href="/#hints">Hints</Link>
      </nav>

      <Link className="header-link" href="/#hints">
        Browse 500 hints <span>&#8600;</span>
      </Link>
    </header>
  );
}
