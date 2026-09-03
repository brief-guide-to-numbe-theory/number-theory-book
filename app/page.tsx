import Image from "next/image";
import bookCover from "../public/book-cover.png";
import HintLookup from "./HintLookup";
import MathBackground from "./MathBackground";
import PrimeSpiral from "./PrimeSpiral";
import ScrollReveal from "./ScrollReveal";
import CountUp from "./CountUp";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Home">
          <span className="brand-mark">&sum;</span>
          <span>ABGNT</span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#general">General</a>
          <a href="#authors">Authors</a>
          <a href="#hints">Hints</a>
        </nav>

        <a className="header-link" href="#hints">
          Browse 500 hints <span>&#8600;</span>
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <PrimeSpiral />
          <div className="hero-copy">
            <p className="eyebrow">
              <span>01</span> An accessible companion to the integers
            </p>

            <h1>
              A brief guide to <em>Number Theory</em>
            </h1>

            <p className="hero-intro">
              A compact field guide to divisibility, primes, congruences, and
              the beautiful patterns hiding inside ordinary whole numbers.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#general">
                Open the guide <span>&rarr;</span>
              </a>
              <a className="text-link" href="#authors">
                Meet the two authors <span>&darr;</span>
              </a>
            </div>
          </div>

          <div className="book-stage">
            <div className="book-shadow"></div>
            <Image
              className="book-cover"
              src={bookCover}
              alt="Cover of A brief guide to Number Theory by Aritra Saha and Riddhiman Seal"
              priority
            />
          </div>

          <div className="hero-metrics">
            <div>
              <strong>
                <CountUp end={500} />
              </strong>
              <span>guided hints</span>
            </div>
            <div>
              <strong>
                <CountUp end={2} />
              </strong>
              <span>author voices</span>
            </div>
            <div>
              <strong>&infin;</strong>
              <span>patterns to find</span>
            </div>
          </div>
        </section>

        <section className="general section" id="general">
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

        <section className="authors section" id="authors">
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

        <section className="hints section" id="hints">
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

      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark">&sum;</span>
          <span>ABGNT</span>
        </a>
        <p>A brief guide to Number Theory</p>
        <a href="#top">Back to top &uarr;</a>
      </footer>

      <ScrollReveal />
    </>
  );
}
