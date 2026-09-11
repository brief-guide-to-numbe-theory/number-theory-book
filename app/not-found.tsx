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
          className="section"
          style={{
            minHeight: "calc(100vh - 86px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            paddingTop: "60px",
            paddingBottom: "80px",
          }}
        >
          <MathBackground variant="light" />

          <div className="section-label" style={{ marginBottom: "32px" }}>
            <span>404</span>
            <span>Solution Not Found</span>
          </div>

          <div className="section-heading" data-reveal style={{ alignItems: "flex-start" }}>
            <div>
              <p className="micro-label" style={{ color: "var(--gold)" }}>
                THEOREM 404 &bull; CONTRADICTION
              </p>

              <h1 style={{ fontSize: "clamp(48px, 6.5vw, 84px)", lineHeight: "1" }}>
                Page
                <br />
                <em>Undefined.</em>
              </h1>
            </div>

            <div style={{ maxWidth: "480px" }}>
              <p style={{ font: "18px/1.7 Georgia, serif", color: "#3a5070", marginBottom: "20px" }}>
                Assume the requested URL exists in the domain of integer solutions. Then its evaluation yields a contradiction.
              </p>
              <p style={{ font: "italic 16px/1.6 Georgia, serif", color: "var(--gold)" }}>
                &ldquo;Proof left as an exercise to the reader.&rdquo;
              </p>
            </div>
          </div>

          <div
            data-reveal
            className="placeholder-sheet"
            style={{
              marginTop: "48px",
              marginBottom: "48px",
              maxWidth: "640px",
              minHeight: "auto",
              padding: "36px 40px",
            }}
          >
            <span style={{ color: "#3a5878", letterSpacing: "0.18em" }}>
              MODULAR ARITHMETIC &bull; PAGE &equiv; 404 (MOD 0)
            </span>
            <p style={{ font: "17px/1.65 Georgia, serif", color: "#2c4263", margin: "16px 0 0" }}>
              The page you are looking for may have been moved, renamed, or never existed in this edition. Use the links below to return to known mathematical terrain.
            </p>
            <strong style={{ position: "absolute", right: "28px", bottom: "16px", color: "var(--gold)", font: "italic 54px Georgia", opacity: 0.8 }}>
              404
            </strong>
          </div>

          <div className="hero-actions-row" data-reveal style={{ gap: "16px" }}>
            <Link className="primary-button" href="/">
              Return Home <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/hints">
              Browse 500 Hints <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/authors">
              Meet the Authors <span>&rarr;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <ScrollReveal />
    </>
  );
}
