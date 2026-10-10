"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    // Synchronize theme changes across different tabs
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

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
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
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Home" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-mark">
            <Image src="/logo.png" alt="ABGNT logo" width={18} height={24} style={{ objectFit: "contain" }} />
          </span>
          <span>ABGNT</span>
        </Link>

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

          {/* Unified Menu Dropdown Toggle Button (Windows, Mac, Phone) */}
          <button
            className={`menu-dropdown-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="menu-icon-box" aria-hidden="true">
              <span className="menu-bar bar-1"></span>
              <span className="menu-bar bar-2"></span>
              <span className="menu-bar bar-3"></span>
            </span>
            <span className="menu-dropdown-label">{mobileMenuOpen ? "Close" : "Menu"}</span>
            <svg
              className="menu-chevron"
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
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        {/* Dropdown Menu Panel (Windows, Mac, & Phone) */}
        <div
          className={`menu-dropdown-panel ${mobileMenuOpen ? "open" : ""}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="menu-dropdown-header">
            <span className="menu-dropdown-micro">DIRECTORY</span>
            <span className="menu-dropdown-tag">3 PAGES</span>
          </div>

          <nav className="menu-dropdown-links" aria-label="Main directory navigation">
            <Link
              href="/"
              className={`menu-dropdown-item ${pathname === "/" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="menu-dropdown-num">1</span>
              <div className="menu-dropdown-text">
                <span className="menu-dropdown-title">About the Book</span>
                <span className="menu-dropdown-sub">Overview, contents, and preview</span>
              </div>
              <span className="menu-dropdown-arrow">&rarr;</span>
            </Link>

            <Link
              href="/authors"
              className={`menu-dropdown-item ${pathname === "/authors" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="menu-dropdown-num">2</span>
              <div className="menu-dropdown-text">
                <span className="menu-dropdown-title">About the Authors</span>
                <span className="menu-dropdown-sub">Meet Aritra Saha &amp; Riddhiman Seal</span>
              </div>
              <span className="menu-dropdown-arrow">&rarr;</span>
            </Link>

            <Link
              href="/hints"
              className={`menu-dropdown-item ${pathname === "/hints" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="menu-dropdown-num">3</span>
              <div className="menu-dropdown-text">
                <span className="menu-dropdown-title">Hints for Practice Problems</span>
                <span className="menu-dropdown-sub">Numbered problem-solving prompts</span>
              </div>
              <span className="menu-dropdown-arrow">&rarr;</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
