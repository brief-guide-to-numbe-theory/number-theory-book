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
  const [expandedPages, setExpandedPages] = useState<Record<string, boolean>>({});
  const headerRef = useRef<HTMLDivElement>(null);

  const togglePageSection = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedPages((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

  // Close menu whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    <header className="site-header" ref={headerRef}>
      <Link className="brand" href="/" aria-label="Home" onClick={() => setMenuOpen(false)}>
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

        {/* Normal Dropdown Menu Container */}
        <div className="menu-container">
          <button
            className={`standard-menu-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label="Navigation Menu"
          >
            <span>Menu</span>
            <svg
              className={`menu-arrow ${menuOpen ? "rotated" : ""}`}
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

          {/* Simple Dropdown Menu */}
          {menuOpen && (
            <div className="standard-dropdown" role="menu">
              {navPages.map((page) => {
                const isActive = pathname === page.href;
                const isExpanded = !!expandedPages[page.key];

                return (
                  <div key={page.key} className="dropdown-group">
                    <div className={`dropdown-row ${isActive ? "active-page" : ""}`}>
                      <Link
                        href={page.href}
                        className="dropdown-page-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        {page.name}
                      </Link>

                      <button
                        type="button"
                        className={`dropdown-more-btn ${isExpanded ? "active" : ""}`}
                        onClick={(e) => togglePageSection(page.key, e)}
                        aria-expanded={isExpanded}
                        title={`Show sections for ${page.name}`}
                      >
                        <span>More</span>
                        <svg
                          className={`more-chevron ${isExpanded ? "expanded" : ""}`}
                          viewBox="0 0 24 24"
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>

                    {/* Section sub-links when "More" is clicked */}
                    {isExpanded && (
                      <div className="dropdown-sections">
                        {page.sections.map((section) => (
                          <Link
                            key={section.href}
                            href={section.href}
                            className="dropdown-section-link"
                            onClick={() => setMenuOpen(false)}
                          >
                            <span className="section-bullet">&bull;</span>
                            <span>{section.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
