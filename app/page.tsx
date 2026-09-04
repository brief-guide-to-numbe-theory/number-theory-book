import Image from "next/image";
import Link from "next/link";
import bookCover from "../public/book-cover.png";
import Header from "./Header";
import Footer from "./Footer";
import HintLookup from "./HintLookup";
import MathBackground from "./MathBackground";
import PrimeSpiral from "./PrimeSpiral";
import ScrollReveal from "./ScrollReveal";
import CountUp from "./CountUp";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section className="hero" id="top">
          <PrimeSpiral />
          <div className="hero-copy">
            <p className="eyebrow">
              <span>01</span> From Fundamentals to Olympiad Excellence
            </p>

            <h1>
              A brief guide to <em>Number Theory</em>
            </h1>

            <p className="hero-intro">
              A compact field guide to divisibility, primes, congruences, and
              the beautiful patterns hiding inside ordinary whole numbers.
            </p>

            <div className="hero-actions">
              <Link className="primary-button" href="/general">
                Open the guide <span>&rarr;</span>
              </Link>
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

      <Footer />

      <ScrollReveal />
    </>
  );
}
