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
              A brief guide to <em>Number Theory</em>
            </h1>

            <p className="hero-subtitle">
              For Excellence in Olympiad Number Theory
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#general">
                Open the guide <span>&rarr;</span>
              </a>
              <Link className="text-link" href="/authors">
                Meet the two authors <span>&darr;</span>
              </Link>
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
              <p className="micro-label">OVERVIEW & PHILOSOPHY</p>
              <h2>
                About the
                <br />
                <em>Book.</em>
              </h2>
            </div>

            <div className="about-book-body">
              <p>
                <strong>A Brief Guide to Number Theory</strong> is a book that
                focuses on elementary number theory, specifically topics which
                are common in Olympiad mathematics. We start from the basics of
                modular arithmetic and go all the way upto advanced concepts like
                quadratic reciprocity, Pell’s equations and density in number
                theory.
              </p>
              <p>
                For a long time, a student with not too much theoretical
                knowledge but strong basics and a little bit of creativity with
                some preparation could clear INMO. However, in the recent years,
                more and more of the problems require a substantial theory,
                especially 2026, featuring solutions with Zsigmondy, Catalan’s,
                LTE and Dirichlet’s. Furthermore, to do well in IMOTC and on the
                IMO, having the theoretical prerequisites is a must. Hence, we
                have included most of the major concepts, as well as included
                problems from various contests for the readers to gain an
                understanding of the topics.
              </p>
              <p>
                Number theoretic functional equations and Combinatorial number theory are on the rise, with at
                least one appearing in each IMO number theory shortlist in the
                recent years indivitually. It is quite surprising that there are so few
                comprehensive resources for the same. Hence, we have dedicated
                an entire chapter to functional equations. The first subsection
                helps the readers gain familiarity with regular algebraic
                techniques, and the next one introduces number theoretic ideas.
                Also, in the last chapter, we have dedicated an entire section for Combinatorial Number Theory.
              </p>
              <p>
                Our most important aim is to help readers understand and
                appreciate the beauty of number theory. We want students to gain
                an intuition and a feel for the subject instead of trying to
                memorise formulas and apply them blindly. Learning number
                theory requires lots of patience and time. The journey is much
                better if you try to enjoy number theory instead of looking for
                end results. The problems are hard, no doubt, and you are
                encouraged to take your time with them.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ScrollReveal />
    </>
  );
}
