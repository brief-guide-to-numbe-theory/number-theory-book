import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import HintLookup from "../HintLookup";
import MathBackground from "../MathBackground";
import ScrollReveal from "../ScrollReveal";

export default function HintsPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "86px" }}>
        <section
          className="hints section"
          id="hints"
          style={{ minHeight: "calc(100vh - 86px)" }}
        >
          <MathBackground variant="light" />
          <div className="section-label">
            <span>3</span>
            <span>Hints</span>
          </div>

          <div className="section-heading" data-reveal>
            <div>
              <h2>
                Hints<em>.</em>
              </h2>
            </div>

            <p>
              Enter the specific number to look for hint for that
              problem. Hints are currently not available.
            </p>
          </div>

          <div className="page-actions-row" data-reveal style={{ marginTop: "32px", marginBottom: "44px" }}>
            <Link className="navy-button" href="/">
              About the Book <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/authors">
              Meet the authors <span>&rarr;</span>
            </Link>
          </div>

          <div data-reveal className="d1">
            <HintLookup />
          </div>
        </section>
      </main>

      <Footer />

      <ScrollReveal />
    </>
  );
}
