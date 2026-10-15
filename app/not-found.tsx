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
        <section
          className="section not-found-section"
          style={{
            minHeight: "calc(100vh - 86px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            padding: "80px clamp(20px, 5vw, 60px)",
          }}
        >
          <MathBackground variant="light" />

          <div
            className="not-found-card"
            data-reveal
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "760px",
              width: "100%",
              background: "rgba(255, 255, 255, 0.78)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(26, 46, 90, 0.16)",
              borderRadius: "16px",
              padding: "clamp(32px, 5vw, 56px)",
              boxShadow: "0 24px 60px rgba(26, 46, 90, 0.08), 0 1px 3px rgba(26, 46, 90, 0.06)",
            }}
          >
            {/* Academic Monograph Header Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(26, 46, 90, 0.12)",
                paddingBottom: "18px",
                marginBottom: "36px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
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
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    opacity: 0.75,
                  }}
                >
                  HTTP Status 404 &bull; Undefined Endpoint
                </span>
              </div>
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "var(--ink)",
                  opacity: 0.65,
                }}
              >
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
                <span
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(64px, 8vw, 96px)",
                    lineHeight: 0.9,
                    color: "var(--ink)",
                    fontWeight: 400,
                    letterSpacing: "-0.04em",
                  }}
                >
                  404
                </span>
                <h1
                  style={{
                    margin: 0,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(26px, 3.2vw, 38px)",
                    fontWeight: 400,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  Page not found<span style={{ color: "var(--gold)" }}>.</span>
                </h1>
              </div>

              <p
                style={{
                  margin: "20px 0 0",
                  font: "17px/1.7 Georgia, serif",
                  color: "var(--ink)",
                  opacity: 0.88,
                  maxWidth: "600px",
                }}
              >
                The requested URL does not correspond to any active chapter, hint, or resource in this volume.
                It may have been relocated, or the reference link may contain a typographical error.
              </p>
            </div>

            {/* Mathematical Formal Statement Box */}
            <div
              style={{
                margin: "28px 0 36px",
                padding: "20px 24px",
                background: "rgba(234, 243, 251, 0.75)",
                borderLeft: "3px solid var(--gold)",
                borderRadius: "0 8px 8px 0",
                fontFamily: "Georgia, serif",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "8px",
                }}
              >
                Formal Statement
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "var(--ink)",
                  fontStyle: "italic",
                }}
              >
                Let <span style={{ fontStyle: "normal", fontFamily: "'Courier New', monospace", fontWeight: 700 }}>R</span> be the set of valid routes in this edition. The requested URI <span style={{ fontStyle: "normal", fontFamily: "'Courier New', monospace", fontWeight: 600 }}>r &notin; R</span>.
              </p>
            </div>

            {/* Directory Navigation Grid */}
            <div style={{ marginTop: "32px" }}>
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  opacity: 0.7,
                }}
              >
                Return to Book Index
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                  gap: "12px",
                }}
              >
                <Link
                  href="/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: "var(--ink)",
                    color: "#fff",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    transition: "transform 0.2s ease, opacity 0.2s ease",
                  }}
                >
                  <span>About the Book</span>
                  <span style={{ color: "var(--gold)", fontSize: "16px" }}>&rarr;</span>
                </Link>

                <Link
                  href="/#contents"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: "rgba(26, 46, 90, 0.05)",
                    color: "var(--ink)",
                    border: "1px solid rgba(26, 46, 90, 0.14)",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>Contents &amp; Preview</span>
                  <span style={{ fontSize: "16px" }}>&rarr;</span>
                </Link>

                <Link
                  href="/hints"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: "rgba(26, 46, 90, 0.05)",
                    color: "var(--ink)",
                    border: "1px solid rgba(26, 46, 90, 0.14)",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>Problem Hints (500+)</span>
                  <span style={{ fontSize: "16px" }}>&rarr;</span>
                </Link>

                <Link
                  href="/authors"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: "rgba(26, 46, 90, 0.05)",
                    color: "var(--ink)",
                    border: "1px solid rgba(26, 46, 90, 0.14)",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>Meet the Authors</span>
                  <span style={{ fontSize: "16px" }}>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Halmos tombstone Q.E.D. mark */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "24px",
                color: "var(--ink)",
                opacity: 0.35,
                fontSize: "13px",
              }}
              title="Halmos Q.E.D. symbol"
            >
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
