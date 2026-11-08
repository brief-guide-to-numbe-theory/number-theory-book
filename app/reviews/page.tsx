import type { Metadata } from "next";
import Header from "../Header";
import Footer from "../Footer";
import MathBackground from "../MathBackground";
import ScrollReveal from "../ScrollReveal";
import ReviewsClient from "./ReviewsClient";
import { getApprovedData } from "../../lib/reviews-store";

export const metadata: Metadata = {
  title: "Reader Reviews & Discussion",
  description:
    "Read reader reviews, ratings, and mathematical discussions about 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal.",
  alternates: {
    canonical: "https://www.numbertheoryguide.in/reviews",
  },
  openGraph: {
    title: "Reader Reviews & Discussion | A Brief Guide to Number Theory",
    description:
      "Read reader reviews, ratings, and mathematical discussions about 'A Brief Guide to Number Theory' by Aritra Saha and Riddhiman Seal.",
    url: "https://www.numbertheoryguide.in/reviews",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ReviewsPage() {
  const initialData = await getApprovedData();

  return (
    <>
      <Header />
      <main id="top" style={{ paddingTop: "86px" }}>
        <section
          className="reviews-section section"
          id="reviews"
          style={{ minHeight: "calc(100vh - 86px)" }}
        >
          <MathBackground variant="light" />

          <div className="section-label">
            <span>4</span>
            <span>Reader Reviews &amp; Discussion</span>
          </div>

          <div className="section-heading" data-reveal>
            <div>
              <h2>
                Reviews &amp; <em>Discussion.</em>
              </h2>
            </div>

            <p>
              Write comment and leave a review and put appropriate ratings for the
              book. Available only for the people with the book.
            </p>
          </div>

          <div className="reader-verified-top-note" data-reveal>
            <div className="reader-note-header">
              <span className="reader-note-icon">&#9432;</span>
              <span className="reader-note-tag">Verified Reader Access &amp; Discord Community</span>
            </div>
            <p className="reader-note-text">
              For readers who have bought our book, please message us over{" "}
              <strong>Discord</strong> (<code>aritra2008</code> or{" "}
              <code>simplisticformulas</code>), <strong>Telegram</strong> (
              <a href="https://t.me/Aritra2008Saha13" target="_blank" rel="noopener noreferrer" className="reader-note-link">@Aritra2008Saha13</a> or{" "}
              <a href="https://t.me/Sudeshna_Seal" target="_blank" rel="noopener noreferrer" className="reader-note-link">@Sudeshna_Seal</a>), or Gmail at{" "}
              <a href="mailto:abgnt.official@gmail.com" className="reader-note-link">
                abgnt.official@gmail.com
              </a>{" "}
              to receive the code for Reader verified messages and get access to our Discord channel.
            </p>
          </div>

          <ReviewsClient initialData={initialData} />
        </section>
      </main>

      <Footer />

      <ScrollReveal />
    </>
  );
}
