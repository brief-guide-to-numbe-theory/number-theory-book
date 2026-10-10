import Link from "next/link";
import Image from "next/image";
import Header from "../Header";
import Footer from "../Footer";
import MathBackground from "../MathBackground";
import ScrollReveal from "../ScrollReveal";

export const metadata = {
  title: "Purchase | A Brief Guide to Number Theory",
  description:
    "Order the paperback edition of A Brief Guide to Number Theory by Aritra Saha and Riddhiman Seal on Amazon.",
};

export default function PurchasePage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "86px" }}>
        <section
          className="section purchase-page-section"
          id="purchase"
          style={{ minHeight: "calc(100vh - 86px)" }}
        >
          <MathBackground variant="light" />

          <div className="section-label">
            <span>4</span>
            <span>Purchase</span>
          </div>

          <div className="section-heading" data-reveal>
            <div>
              <p className="micro-label" style={{ color: "var(--gold)" }}>
                NOW AVAILABLE &bull; OFFICIAL PAPERBACK EDITION
              </p>
              <h2>
                Order the <em>Book.</em>
              </h2>
            </div>
            <p>
              Get your copy of <em>A Brief Guide to Number Theory</em>. Master elementary to advanced Olympiad Number Theory with hand-picked modern problems, detailed functional equations, and comprehensive theory.
            </p>
          </div>

          <div className="page-actions-row" data-reveal style={{ marginTop: "32px", marginBottom: "44px" }}>
            <Link className="navy-button" href="/">
              About the Book <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/authors">
              Meet the authors <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/hints">
              Hints <span>&rarr;</span>
            </Link>
          </div>

          <div className="purchase-card-container" id="details" data-reveal>
            <div className="purchase-showcase-card">
              <div className="purchase-book-stage">
                <a
                  href="https://amzn.in/d/027tMJIL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="purchase-cover-link"
                  title="View on Amazon"
                  aria-label="View A Brief Guide to Number Theory on Amazon"
                >
                  <Image
                    src="/book-cover.png"
                    alt="Cover of A Brief Guide to Number Theory"
                    width={320}
                    height={460}
                    className="purchase-cover-img"
                    priority
                  />
                  <span className="purchase-badge">Click to view on Amazon &nearr;</span>
                </a>
              </div>

              <div className="purchase-details">
                <span className="purchase-tag">Paperback Edition</span>
                <h3 className="purchase-book-title">A Brief Guide to Number Theory</h3>
                <p className="purchase-authors">By <strong>Aritra Saha</strong> &amp; <strong>Riddhiman Seal</strong></p>

                <div className="purchase-specs">
                  <div className="spec-item">
                    <span className="spec-label">Format</span>
                    <strong className="spec-val">Paperback</strong>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Availability</span>
                    <strong className="spec-val" style={{ color: "#16a34a" }}>In Stock on Amazon</strong>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Audience</span>
                    <strong className="spec-val">IOQM &bull; RMO &bull; INMO &bull; IMO &bull; AIME</strong>
                  </div>
                </div>

                <div className="purchase-highlights">
                  <h4>What&apos;s Inside:</h4>
                  <ul>
                    <li>
                      <span className="highlight-bullet">&bull;</span>
                      <span><strong>6 In-Depth Chapters</strong> spanning fundamental modular arithmetic, integer polynomials, primitive roots, and density.</span>
                    </li>
                    <li>
                      <span className="highlight-bullet">&bull;</span>
                      <span><strong>Dedicated Functional Equations Chapter</strong> covering both algebraic foundations and cutting-edge Olympiad techniques.</span>
                    </li>
                    <li>
                      <span className="highlight-bullet">&bull;</span>
                      <span><strong>Carefully Curated Problems</strong> featuring modern, lesser-known contest problems and AoPS gems from recent years.</span>
                    </li>
                    <li>
                      <span className="highlight-bullet">&bull;</span>
                      <span><strong>Comprehensive Hints</strong> for 500+ practice problems accessible directly on this website.</span>
                    </li>
                  </ul>
                </div>

                <div className="purchase-cta-box">
                  <a
                    href="https://amzn.in/d/027tMJIL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-buy-cta-btn"
                  >
                    <span>Order on Amazon</span>
                    <span className="cta-arrow">&nearr;</span>
                  </a>
                  <p className="purchase-delivery-note">
                    Secure ordering and fast delivery fulfilled by Amazon India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
