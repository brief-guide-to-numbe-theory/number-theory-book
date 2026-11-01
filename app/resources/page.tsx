import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "../Header";
import Footer from "../Footer";
import MathBackground from "../MathBackground";
import ScrollReveal from "../ScrollReveal";

export const metadata: Metadata = {
  title: "Recommended Olympiad Resources & Books",
  description:
    "Recommended Olympiad resources for Algebra and Combinatorics — 'Al-Jabr: Higher Algebraic Yield' and 'An Exploration of Olympiad Combinatorics' to complement 'A Brief Guide to Number Theory'.",
  alternates: {
    canonical: "https://www.numbertheoryguide.in/resources",
  },
  openGraph: {
    title: "Olympiad Resources | A Brief Guide to Number Theory",
    description:
      "Recommended Olympiad resources for Algebra and Combinatorics — 'Al-Jabr: Higher Algebraic Yield' and 'An Exploration of Olympiad Combinatorics'.",
    url: "https://www.numbertheoryguide.in/resources",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main id="top" style={{ paddingTop: "86px" }}>
        <section
          className="resources-section section"
          id="resources"
          style={{ minHeight: "calc(100vh - 86px)" }}
        >
          <MathBackground variant="light" />

          <div className="section-label">
            <span>5</span>
            <span>Olympiad Resources</span>
          </div>

          <div className="section-heading" data-reveal>
            <div>
              <h2>
                Olympiad <em>Resources.</em>
              </h2>
            </div>

            <p>
              For readers who wants to check other book for Olympiad resources.
            </p>
          </div>

          <div
            className="page-actions-row"
            data-reveal
            style={{ marginTop: "32px", marginBottom: "44px" }}
          >
            <Link className="navy-button" href="/">
              About the Book <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/authors">
              Meet the Authors <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/hints">
              Hints <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/reviews">
              Reviews &amp; Discussion <span>&rarr;</span>
            </Link>
          </div>

          <p className="resources-intro-lead" data-reveal>
            For readers who wants to check other book for Olympiad resources, here are our recommended books in <strong>Algebra</strong> and <strong>Combinatorics</strong> to complement your Olympiad journey alongside <em>A Brief Guide to Number Theory</em>.
          </p>

          <div className="resources-grid">
            {/* 1. Algebra: Al-Jabr */}
            <article className="resource-card" id="algebra" data-reveal>
              <div className="resource-cover-col">
                <a
                  href="https://amzn.in/d/0iew0lRb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-cover-link"
                  title="View 'Al-Jabr: Higher Algebraic Yield' on Amazon"
                >
                  <Image
                    src="/al-jabr-cover.png"
                    alt="Al-Jabr: Higher Algebraic Yield Book Cover"
                    width={320}
                    height={450}
                    priority
                    className="resource-cover-img"
                  />
                </a>

                <div className="resource-cover-caption">
                  <h3 className="resource-book-title">Al-Jabr: Higher Algebraic Yield</h3>
                  <p className="resource-book-sub">In Mathematical Olympiad</p>
                  <p className="resource-book-author">
                    Hatem Al-Ani &bull; Ali Al-Ani &bull; Yousuf Wameedh
                  </p>
                </div>
              </div>

              <div className="resource-info-col">
                <span className="resource-subject-badge">&#9670; Algebra</span>

                <h3 className="resource-info-title">
                  Al-Jabr: <em>Higher Algebraic Yield</em>
                </h3>

                <p className="resource-text">
                  Al-Jabr: Higher Algebraic Yield is an Olympiad-level algebra and combinatorial algebra book focusing on the modern style of algebraic problem-solving featured in mathematical competitions. As we have learned from our experience in Mathematical Olympiads, learning math is mostly by doing problems. Although we have explicitly stated many techniques before solving the problems and examples, there are still many ideas that underlies in each problem that were not covered in this book. Most of the chapters of this book contains: examples, problems, and exercises ordered roughly in increasing difficulty, ranging from sub-IMO problem 1/4 level up to IMO problem 3/6 level.
                </p>

                <div className="resource-buy-actions">
                  <a
                    href="https://amzn.in/d/0iew0lRb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-btn-gold"
                    title="Order on Amazon India"
                  >
                    Buy on Amazon.in <span>&rarr;</span>
                  </a>
                  <a
                    href="https://a.co/d/0ifmxGCk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-btn-outline"
                    title="Order on Amazon.com"
                  >
                    Buy on Amazon.com <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </article>

            {/* 2. Combinatorics: An Exploration of Olympiad Combinatorics */}
            <article className="resource-card" id="combinatorics" data-reveal>
              <div className="resource-cover-col">
                <a
                  href="https://amzn.in/d/08ZCrVE6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-cover-link"
                  title="View 'An Exploration of Olympiad Combinatorics' on Amazon"
                >
                  <Image
                    src="/combinatorics-cover.png"
                    alt="An Exploration of Olympiad Combinatorics Book Cover"
                    width={320}
                    height={450}
                    priority
                    className="resource-cover-img"
                  />
                </a>

                <div className="resource-cover-caption">
                  <h3 className="resource-book-title">
                    An Exploration of Olympiad Combinatorics
                  </h3>
                  <p className="resource-book-sub">For RMO, INMO &amp; IMO Preparation</p>
                  <p className="resource-book-author">
                    By Rushil Mathur &bull; Bhaskaracharya Pratishthana
                  </p>
                </div>
              </div>

              <div className="resource-info-col">
                <span className="resource-subject-badge">&#9670; Combinatorics</span>

                <h3 className="resource-info-title">
                  An Exploration of <em>Olympiad Combinatorics</em>
                </h3>

                <p className="resource-text">
                  &ldquo;An Exploration of Olympiad Combinatorics&rdquo; is designed to help readers prepare for international mathematical olympiads like the International Mathematical Olympiad (IMO) and national olympiads like the Regional Mathematical olympiad (RMO) and the Indian National Mathematical Olympiad (INMO) in India. The book covers a wide range of combinatorial topics, progressing from fundamentals like counting principles and induction to advanced fields including algorithms, graph theory, and the probabilistic method. The book is written in a unique conversational style and breaks away from the traditional problem-solution format. This approach aims to engage the reader and encourage them to find solutions independently and develop problem-solving skills.
                </p>

                <div className="resource-buy-actions">
                  <a
                    href="https://amzn.in/d/08ZCrVE6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="amazon-btn-gold"
                    title="Order on Amazon India"
                  >
                    Buy on Amazon.in <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollReveal />
    </>
  );
}
