import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import MathBackground from "./MathBackground";
import ScrollReveal from "./ScrollReveal";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="top" style={{ paddingTop: "86px" }}>
        <section
          className="section not-found-section"
          style={{ minHeight: "calc(100vh - 86px)" }}
        >
          <MathBackground variant="light" />

          <div className="section-label">
            <span>404</span>
            <span>Page Not Found</span>
          </div>

          <div className="section-heading" data-reveal>
            <div>
              <h1>
                Page not <em>found.</em>
              </h1>
            </div>

            <p>
              The page or section you requested does not exist in this volume. It
              may have been moved, renamed, or left unwritten.
            </p>
          </div>

          <div
            className="page-actions-row not-found-actions"
            data-reveal
          >
            <Link className="primary-button" href="/">
              About the Book <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/hints">
              Hints <span>&rarr;</span>
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
