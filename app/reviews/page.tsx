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

export default function ReviewsPage() {
  const initialData = getApprovedData();

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
              Impressions, ratings, and mathematical notes from students,
              awardees, and educators. All submissions are reviewed by the
              authors before publishing.
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
