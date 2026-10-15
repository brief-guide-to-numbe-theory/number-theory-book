import type { Metadata } from "next";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import HintLookup from "../HintLookup";
import MathBackground from "../MathBackground";
import ScrollReveal from "../ScrollReveal";

export const metadata: Metadata = {
  title: "Hints for Practice Problems",
  description:
    "Look up hints for 500+ numbered practice problems from 'A Brief Guide to Number Theory', the Olympiad Number Theory Book by Aritra Saha and Riddhiman Seal.",
  alternates: {
    canonical: "https://www.numbertheoryguide.in/hints",
  },
  openGraph: {
    title: "Hints for Practice Problems | A Brief Guide to Number Theory",
    description:
      "Look up hints for 500+ numbered practice problems from 'A Brief Guide to Number Theory', the Olympiad Number Theory Book by Aritra Saha and Riddhiman Seal.",
    url: "https://www.numbertheoryguide.in/hints",
  },
};

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
            <span>Hints for Practice Problems</span>
          </div>

          <div className="section-heading" data-reveal>
            <div>
              <h2>
                Hints for <em>Practice Problems.</em>
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
