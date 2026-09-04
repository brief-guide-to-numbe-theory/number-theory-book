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
            <span>03</span>
            <span>Hints</span>
          </div>

          <div className="section-heading" data-reveal>
            <div>
              <p className="micro-label">A NUDGE, NOT A SPOILER</p>

              <h2>
                Find your
                <br />
                <em>next move.</em>
              </h2>
            </div>

            <p>
              Five hundred numbered prompts, kept out of sight until you need
              one. Enter the complete three-digit number to reveal only that
              hint.
            </p>
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
