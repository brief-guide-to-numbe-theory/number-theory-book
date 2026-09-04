import Header from "../Header";
import Footer from "../Footer";
import MathBackground from "../MathBackground";
import ScrollReveal from "../ScrollReveal";

export default function GeneralPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "86px" }}>
        <section
          className="general section"
          id="general"
          style={{ minHeight: "calc(100vh - 86px)" }}
        >
          <MathBackground variant="light" />
          <div className="section-label">
            <span>01</span>
            <span>General</span>
          </div>

          <div className="placeholder" data-reveal>
            <div className="placeholder-copy">
              <p className="micro-label">RESERVED FOR BOOK INFORMATION</p>

              <h2>
                General content
                <br />
                <em>coming soon.</em>
              </h2>

              <p>
                This section is a placeholder for the book overview,
                introductory note, chapter summary, and other general
                information.
              </p>
            </div>

            <div className="placeholder-sheet" aria-hidden="true">
              <span>GENERAL</span>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <strong>01</strong>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
