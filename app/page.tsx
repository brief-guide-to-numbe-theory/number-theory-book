import Image from "next/image";
import Link from "next/link";
import bookCover from "../public/book-cover.png";
import Header from "./Header";
import Footer from "./Footer";
import MathBackground from "./MathBackground";
import PrimeSpiral from "./PrimeSpiral";
import ScrollReveal from "./ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section className="hero" id="top">
          <PrimeSpiral />
          <div className="hero-copy">
            <p className="eyebrow">
              <span>01</span> Guide to the book
            </p>

            <h1>
              <span className="hero-line-1">A Brief Guide to</span>
              <em>Number Theory</em>
            </h1>

            <p className="hero-subtitle">
              Explore the beauty of Olympiad Number Theory
            </p>

            <div className="hero-actions-container">
              <div className="hero-actions-row">
                <a className="primary-button" href="#general">
                  About the Book <span>&darr;</span>
                </a>
                <a className="primary-button" href="#prerequisites">
                  Prerequisites <span>&darr;</span>
                </a>
                <a className="primary-button" href="#contents">
                  Contents <span>&darr;</span>
                </a>
              </div>
              <div className="hero-actions-divider" />
              <div className="hero-actions-row">
                <Link className="navy-button" href="/authors">
                  Meet the authors <span>&rarr;</span>
                </Link>
                <Link className="navy-button" href="/hints">
                  Browse 500 hints <span>&rarr;</span>
                </Link>
              </div>
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
        </section>

        <section className="general section" id="general">
          <MathBackground variant="light" />
          <div className="section-label">
            <span>01</span>
            <span>About the Book</span>
          </div>

          <div className="about-book-grid" data-reveal>
            <div className="about-book-heading">
              <h2>About the <em>Book.</em></h2>
            </div>

            <div className="about-book-body">
              <p>
                <strong>A Brief Guide to Number Theory</strong> is a book that
                focuses on elementary number theory, specifically topics that are
                common in Olympiad mathematics. We start from the basics of
                modular arithmetic and progress to advanced concepts like
                quadratic reciprocity, Pell's equations, and density in number
                theory.
              </p>
              <p>
                For a long time, a student without extensive theoretical
                knowledge—but with strong fundamentals, a bit of creativity, and
                adequate preparation—could clear the INMO. However, in recent
                years, more and more problems have required a substantial
                theoretical background, especially in 2026, which featured
                solutions involving Zsigmondy's theorem, Catalan's conjecture,
                LTE, and Dirichlet's theorem. Furthermore, to do well in the
                IMOTC and at the IMO, having the theoretical prerequisites is a
                must. Hence, we have included most of the major concepts along
                with problems from various contests to help readers gain a deeper
                understanding of these topics.
              </p>
              <p>
                Number-theoretic functional equations are on the rise, with at
                least one appearing in the IMO number theory shortlist in recent
                years. It is quite surprising that there are so few comprehensive
                resources on this topic. Hence, we have dedicated an entire
                chapter to functional equations. The first subsection helps
                readers gain familiarity with regular algebraic techniques, while
                the next introduces number-theoretic ideas.
              </p>
              <p>
                Another topic we have included is combinatorial number theory.
                Many problems in recent IMO number theory shortlists involve ideas
                that are combinatorial in nature. These problems often pose
                challenges to even the top ten countries at the IMO.
                Furthermore, very few resources are curated specifically for such
                problems, which is why we have written a section dedicated to
                them. This section focuses heavily on exercises and solved
                examples, though we do assume some basic knowledge of
                combinatorics. Prerequisites (for this section and the rest of
                the book in general) are mentioned on a separate page.
              </p>
              <p>
                Our primary goal is to help readers understand and appreciate
                the beauty of number theory. We want students to gain intuition
                and a feeling for the subject instead of memorizing formulas and
                applying them blindly. Learning number theory requires patience and
                time; the journey is much more rewarding if you try to enjoy the
                subject rather than focus solely on the end results. The
                problems are undeniably hard, and you are strongly encouraged to
                take your time with them.
              </p>
            </div>
          </div>

          <div className="prerequisites-container" id="prerequisites" data-reveal>
            <div className="section-label">
              <span>02</span>
              <span>Prerequisites</span>
            </div>

            <div className="prerequisites-grid">
              <div className="prerequisites-heading">
                <h2>Prerequisites <em>for Readers.</em></h2>
                <p className="prerequisites-intro">
                  Because this book is designed mainly for national level
                  Olympiads like INMO and international Olympiads like the IMO,
                  the reader should be comfortable with basic number theory,
                  basic algebra, and common manipulations.
                </p>
              </div>

              <div className="prerequisites-content">
                <div className="prereq-card">
                  <div className="prereq-header">
                    <span className="prereq-num">01</span>
                    <h3>Chapter 1</h3>
                  </div>
                  <p>
                    The reader should be somewhat comfortable with the properties of
                    modular arithmetic (addition and multiplication modulo an integer,
                    statements of Fermat’s Little Theorem, and Euler’s Totient
                    Function). Simply having read or knowing the definitions may not be
                    enough; some experience working with modular arithmetic is
                    recommended.
                  </p>
                </div>

                <div className="prereq-card">
                  <div className="prereq-header">
                    <span className="prereq-num">02</span>
                    <h3>Chapter 2</h3>
                  </div>
                  <div className="prereq-bullets">
                    <p>
                      The first bonus lemma uses the Maclaurin expansion of
                      logarithms. However, this is used nowhere else, so there is no
                      need to read up on it.
                    </p>
                    <p>
                      The Binomial Theorem is featured in one of the exercises. For
                      the purposes of this chapter, not much familiarity is needed;
                      knowing the statement is enough. Knowing the formulas for
                      binomial coefficients is also required.
                    </p>
                    <p>
                      Being able to solve linear recurrences and knowing about the
                      characteristic equation is recommended, though the use of this
                      is not very extensive.
                    </p>
                    <p>
                      The bonus lemma for this chapter (the n=3 case of Fermat’s Last
                      Theorem) requires heavy use of algebraic number theory.
                      However, the reader need not read up much, as it appears in
                      very few places.
                    </p>
                  </div>
                </div>

                <div className="prereq-card">
                  <div className="prereq-header">
                    <span className="prereq-num">03</span>
                    <h3>Chapter 3</h3>
                  </div>
                  <p>
                    For the Quadratic Reciprocity section, the reader must be
                    comfortable with summations (properties like switching
                    summations, etc.) and well-versed in the Binomial Theorem.
                  </p>
                </div>

                <div className="prereq-card">
                  <div className="prereq-header">
                    <span className="prereq-num">04</span>
                    <h3>Chapter 4</h3>
                  </div>
                  <div className="prereq-bullets">
                    <p>
                      For the Integer Polynomials section, the reader must be familiar
                      with the algebraic properties of polynomials. Some of these are
                      listed in the book, but it is helpful to have studied
                      polynomials in some detail previously.
                    </p>
                    <p>
                      A little bit of differentiation is used here and there, but
                      nothing too heavy. Knowledge of common derivatives, the
                      product rule, and the chain rule is sufficient.
                    </p>
                    <p>
                      In one of the solved examples, we make use of integrals. Again,
                      knowing the integrals of common functions is enough.
                    </p>
                    <p>
                      For the section on Cyclotomic Polynomials, having basic
                      familiarity with complex numbers is enough. The section on the
                      properties of Cyclotomic Polynomials does not have any extra
                      prerequisites, but one must be comfortable with each property
                      before moving on to the next.
                    </p>
                  </div>
                </div>

                <div className="prereq-card">
                  <div className="prereq-header">
                    <span className="prereq-num">05</span>
                    <h3>Chapter 5</h3>
                  </div>
                  <p>
                    The reader must thoroughly complete the first section before
                    moving on to the second section. There is no prerequisite for the
                    first section. The second section requires a good knowledge of
                    all the other chapters covered so far.
                  </p>
                </div>

                <div className="prereq-card">
                  <div className="prereq-header">
                    <span className="prereq-num">06</span>
                    <h3>Chapter 6</h3>
                  </div>
                  <div className="prereq-bullets">
                    <p>
                      For Size and Density in Number Theory, the content is slightly
                      more algebraic. The reader must be able to work well with
                      summations, especially in the density part.
                    </p>
                    <p>
                      For the section on Combinatorial Number Theory, the reader must
                      be comfortable with ideas in combinatorics, such as graph
                      theory, the Pigeonhole Principle, and a few local and global
                      ideas. The OTIS Excerpts is a great resource for reading up on
                      these topics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contents-container" id="contents" data-reveal>
            <div className="section-label">
              <span>03</span>
              <span>Contents & Preview</span>
            </div>

            <div className="contents-heading">
              <h2>Contents <em>&amp; Preview.</em></h2>
              <p className="contents-intro">
                Here are the chapters and their respective sections of the book.
              </p>
            </div>

            <div className="chapter-grid">
              <div className="chapter-card">
                <span className="chapter-badge">Chapter 01</span>
                <h3>Modular Arithmetic</h3>
                <ul className="section-list">
                  <li>
                    <span className="section-num">1.1</span>
                    <span>Meaning of &lsquo;Mod&rsquo;</span>
                  </li>
                  <li>
                    <span className="section-num">1.2</span>
                    <span>Inverse Modulo and its uses</span>
                  </li>
                </ul>
              </div>

              <div className="chapter-card">
                <span className="chapter-badge">Chapter 02</span>
                <h3>Divisibility</h3>
                <ul className="section-list">
                  <li>
                    <span className="section-num">2.1</span>
                    <span>Fundamentals of Divisibility</span>
                  </li>
                  <li>
                    <span className="section-num">2.2</span>
                    <span>Greatest Common Divisor</span>
                  </li>
                  <li>
                    <span className="section-num">2.3</span>
                    <span>Techniques in Diophantine Equations</span>
                  </li>
                  <li>
                    <span className="section-num">2.4</span>
                    <span>Divisors</span>
                  </li>
                </ul>
              </div>

              <div className="chapter-card">
                <span className="chapter-badge">Chapter 03</span>
                <h3>Advanced Modular Arithmetic</h3>
                <ul className="section-list">
                  <li>
                    <span className="section-num">3.1</span>
                    <span>Orders</span>
                  </li>
                  <li>
                    <span className="section-num">3.2</span>
                    <span>Primitive Roots</span>
                  </li>
                  <li>
                    <span className="section-num">3.3</span>
                    <span>Quadratic Residues</span>
                  </li>
                </ul>
              </div>

              <div className="chapter-card">
                <span className="chapter-badge">Chapter 04</span>
                <h3>Prime Exponents &amp; Polynomials</h3>
                <ul className="section-list">
                  <li>
                    <span className="section-num">4.1</span>
                    <span>P-adic valuation</span>
                  </li>
                  <li>
                    <span className="section-num">4.2</span>
                    <span>Integer Polynomials</span>
                  </li>
                  <li>
                    <span className="section-num">4.3</span>
                    <span>Cyclotomic Polynomials and their uses</span>
                  </li>
                </ul>
              </div>

              <div className="chapter-card">
                <span className="chapter-badge">Chapter 05</span>
                <h3>Number Theoretic Functional Equations</h3>
                <ul className="section-list">
                  <li>
                    <span className="section-num">5.1</span>
                    <span>Algebraic Techniques in Functional Equations</span>
                  </li>
                  <li>
                    <span className="section-num">5.2</span>
                    <span>Number Theoretic Ideas in FE&apos;s</span>
                  </li>
                </ul>
              </div>

              <div className="chapter-card">
                <span className="chapter-badge">Chapter 06</span>
                <h3>Miscellaneous Ideas</h3>
                <ul className="section-list">
                  <li>
                    <span className="section-num">6.1</span>
                    <span>Size and Density in Number Theory</span>
                  </li>
                  <li>
                    <span className="section-num">6.2</span>
                    <span>Combinatorial Number Theory</span>
                  </li>
                  <li>
                    <span className="section-num">6.3</span>
                    <span>Some Cool/Useful Theorems</span>
                  </li>
                </ul>
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
