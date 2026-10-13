"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface NavPage {
  name: string;
  href: string;
  key: string;
  sections: { name: string; href: string }[];
}

const navPages: NavPage[] = [
  {
    name: "About the Book",
    href: "/",
    key: "about",
    sections: [
      { name: "About the Book", href: "/#general" },
      { name: "Contents & Preview", href: "/#contents" },
      { name: "Prerequisites", href: "/#prerequisites" },
      { name: "Acknowledgements", href: "/#acknowledgements" },
    ],
  },
  {
    name: "Authors",
    href: "/authors",
    key: "authors",
    sections: [
      { name: "About the Authors", href: "/authors#authors" },
      { name: "The Story Behind the Book", href: "/authors#story" },
    ],
  },
  {
    name: "Hints",
    href: "/hints",
    key: "hints",
    sections: [
      { name: "Hints for Practice Problems", href: "/hints#hints" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("abgnt-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "abgnt-theme" && (e.newValue === "light" || e.newValue === "dark")) {
        setTheme(e.newValue);
        document.documentElement.setAttribute("data-theme", e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("abgnt-theme-channel");
      bc.onmessage = (event) => {
        if (event.data === "light" || event.data === "dark") {
          setTheme(event.data);
          document.documentElement.setAttribute("data-theme", event.data);
        }
      };
    } catch {}

    return () => {
      window.removeEventListener("storage", handleStorage);
      try {
        bc?.close();
      } catch {}
    };
  }, []);

  // Close menu whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("abgnt-theme", nextTheme);

    try {
      const bc = new BroadcastChannel("abgnt-theme-channel");
      bc.postMessage(nextTheme);
      bc.close();
    } catch {}
  };

  return (
    <>
      <header className="site-header" ref={headerRef}>
        {/* Left Section: Menu Button on Left + Brand Logo */}
        <div className="header-left">
          <button
            className={`standard-menu-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Navigation Menu"
            title={menuOpen ? "Close menu" : "Open menu"}
          >
            <span>Menu</span>
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Center Section: Tabs in header for Windows / Desktop / Laptop */}
        <nav className="header-nav-tabs" aria-label="Main Navigation">
          <Link
            href="/"
            className={`header-nav-tab ${pathname === "/" ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            About the Book
          </Link>
          <Link
            href="/authors"
            className={`header-nav-tab ${pathname === "/authors" ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Authors
          </Link>
          <Link
            href="/hints"
            className={`header-nav-tab ${pathname === "/hints" ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Hints
          </Link>
        </nav>

        {/* Right Section: Theme Toggle and Brand Logo (Logo in rightmost part) */}
        <div className="header-right">
          {mounted && (
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "dark" ? (
                <svg className="theme-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg className="theme-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          )}

          <Link className="brand" href="/" aria-label="Home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">
              <Image src="/logo.png" alt="ABGNT logo" width={18} height={24} style={{ objectFit: "contain" }} />
            </span>
            <span>ABGNT</span>
          </Link>
        </div>
      </header>

      {/* Oxford-Style Side Menu Drawer & Backdrop */}
      {menuOpen && (
        <div
          className="oxford-menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`oxford-menu-drawer ${menuOpen ? "open" : ""}`}
        aria-label="Side Navigation"
        aria-hidden={!menuOpen}
      >
        {/* Background Watermark Crest */}
        <div className="oxford-watermark" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="100" cy="100" r="76" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M60 140 L100 50 L140 140 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Drawer Header */}
        <div className="oxford-drawer-header">
          <Link
            className="brand oxford-drawer-brand"
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            <span className="brand-mark">
              <Image src="/logo.png" alt="ABGNT logo" width={18} height={24} style={{ objectFit: "contain" }} />
            </span>
            <span>ABGNT</span>
          </Link>

          <button
            className="oxford-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span>Menu</span>
            <span className="oxford-close-x">&times;</span>
          </button>
        </div>

        {/* Menu Items List - Oxford Style */}
        <nav className="oxford-menu-nav">
          {navPages.map((page) => (
            <div key={page.key} className="oxford-menu-group">
              <div className="oxford-menu-row">
                <Link
                  href={page.href}
                  className="oxford-menu-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="oxford-link-text">{page.name}</span>
                  <span className="oxford-arrow">&rarr;</span>
                </Link>
              </div>

              {page.sections && page.sections.length > 0 && (
                <div className="oxford-submenu">
                  {page.sections.map((section) => (
                    <Link
                      key={section.href}
                      href={section.href}
                      className="oxford-submenu-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="oxford-sub-bullet">&bull;</span>
                      <span>{section.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Amazon Direct Order Option in Menu */}
          <div className="oxford-menu-group oxford-amazon-group">
            <div className="oxford-menu-row">
              <a
                href="https://amzn.in/d/027tMJIL"
                target="_blank"
                rel="noopener noreferrer"
                className="oxford-menu-link oxford-amazon-link"
                onClick={() => setMenuOpen(false)}
              >
                <span className="oxford-link-text">Order on Amazon</span>
                <span className="oxford-arrow">&rarr;</span>
              </a>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
