import Header from "../Header";
import Footer from "../Footer";
import MathBackground from "../MathBackground";
import ScrollReveal from "../ScrollReveal";

export default function AuthorsPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "86px" }}>
        <section
          className="authors section"
          id="authors"
          style={{ minHeight: "calc(100vh - 86px)" }}
        >
          <MathBackground variant="dark" />
          <div className="section-label light">
            <span>02</span>
            <span>Authors</span>
          </div>

          <div className="section-heading" data-reveal>
            <h2>
              Two minds.
              <br />
              <em>One conversation.</em>
            </h2>

            <p>
              The book is designed as a dialogue between complementary
              mathematical instincts: seeing the structure and finding the next
              move.
            </p>
          </div>

          <div className="author-grid">
            <article className="author-card first" data-reveal>
              <div className="author-mark">
                <span>A</span>
                <small>01</small>
              </div>

              <div className="author-copy">
                <p className="author-role">THE STRUCTURALIST</p>

                <h3>Author One</h3>

                <p>
                  Brings the broad view—connecting definitions, proofs, and
                  recurring patterns so each new idea has a natural place in the
                  larger story.
                </p>

                <div className="tags">
                  <span>Clarity</span>
                  <span>Proof</span>
                  <span>Structure</span>
                </div>
              </div>
            </article>

            <article className="author-card second d1" data-reveal>
              <div className="author-mark">
                <span>B</span>
                <small>02</small>
              </div>

              <div className="author-copy">
                <p className="author-role">THE PROBLEM-SOLVER</p>

                <h3>Author Two</h3>

                <p>
                  Keeps the mathematics moving—offering examples, tactical
                  questions, and the carefully timed nudge that helps a stuck
                  idea unfold.
                </p>

                <div className="tags">
                  <span>Examples</span>
                  <span>Strategy</span>
                  <span>Insight</span>
                </div>
              </div>
            </article>
          </div>

          <p className="author-note">
            Author names and biographies can be replaced when the final details
            are supplied.
          </p>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
