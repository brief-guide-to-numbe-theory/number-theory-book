import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import MathBackground from "./MathBackground";
import ScrollReveal from "./ScrollReveal";

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "86px" }}>
        <section className="section not-found-section">
          <MathBackground variant="light" />

          <div className="not-found-card" data-reveal>
            {/* Running Monograph Header Bar */}
            <div className="not-found-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                  }}
                />
                <span className="not-found-badge">
                  HTTP Status 404 &bull; Undefined Endpoint
                </span>
              </div>
              <span className="not-found-site-label">
                A Brief Guide to Number Theory
              </span>
            </div>

            {/* Core Heading */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "18px",
                  flexWrap: "wrap",
                }}
              >
                <span className="not-found-num">
                  404
                </span>
                <h1 className="not-found-title">
                  Page not found<span style={{ color: "var(--gold)" }}>.</span>
                </h1>
              </div>

              <p className="not-found-desc">
                The requested URL does not correspond to any active chapter, hint, or resource in this volume.
                It may have been relocated, or the reference link may contain a typographical error.
              </p>
            </div>

            {/* Mathematical Statement Box */}
            <div className="not-found-math-box">
              <div className="not-found-math-tag">
                Mathematical Statement
              </div>
              <p className="not-found-math-text">
                Let <span style={{ fontStyle: "normal", fontFamily: "'Courier New', monospace", fontWeight: 700 }}>D</span> denote the domain of all indexed resources in this volume. The requested URI <span style={{ fontStyle: "normal", fontFamily: "'Courier New', monospace", fontWeight: 600 }}>r &notin; D</span>.
              </p>
            </div>

            {/* Directory Navigation Grid */}
            <div style={{ marginTop: "32px" }}>
              <p className="not-found-nav-label">
                Return to Book Index
              </p>

              <div className="not-found-nav-grid">
                <Link href="/" className="not-found-nav-btn-primary">
                  <span>About the Book</span>
                  <span style={{ color: "var(--gold)", fontSize: "16px" }}>&rarr;</span>
                </Link>

                <Link href="/#contents" className="not-found-nav-btn">
                  <span>Contents &amp; Preview</span>
                  <span style={{ fontSize: "16px" }}>&rarr;</span>
                </Link>

                <Link href="/hints" className="not-found-nav-btn">
                  <span>Hints</span>
                  <span style={{ fontSize: "16px" }}>&rarr;</span>
                </Link>

                <Link href="/authors" className="not-found-nav-btn">
                  <span>Meet the Authors</span>
                  <span style={{ fontSize: "16px" }}>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Halmos tombstone Q.E.D. mark */}
            <div className="not-found-halmos" title="Halmos Q.E.D. symbol">
              &#9632;
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ScrollReveal />
    </>
  );
}
