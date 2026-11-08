"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ReviewItem, ReviewsStats } from "../../lib/types";
import { renderMathInText } from "../../lib/math-render";

interface ReviewsClientProps {
  initialData: {
    reviews: ReviewItem[];
    comments: ReviewItem[];
    stats: ReviewsStats;
  };
}

export default function ReviewsClient({ initialData }: ReviewsClientProps) {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState<"all" | "reviews" | "comments">("all");

  // Reader QR Code verification states
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [readerCode, setReaderCode] = useState("");
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [pendingActionType, setPendingActionType] = useState<"review" | "comment">("review");
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");

  // Form states
  const [formType, setFormType] = useState<"review" | "comment">("review");
  const [hasBought, setHasBought] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [mathBackground, setMathBackground] = useState("");
  const [content, setContent] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Check reader unlock state on mount and from QR link
  useEffect(() => {
    // 1. Check localStorage
    const saved = localStorage.getItem("abgnt-reader-code");
    if (saved) {
      setIsUnlocked(true);
      setReaderCode(saved);
    }

    // 2. Check query parameter (?code=...)
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (code) {
        const clean = decodeURIComponent(code).trim();
        fetch("/api/reviews/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: clean }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.valid) {
              localStorage.setItem("abgnt-reader-code", clean);
              setIsUnlocked(true);
              setReaderCode(clean);

              // Clean query parameter from URL bar
              const url = new URL(window.location.href);
              url.searchParams.delete("code");
              window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
            }
          })
          .catch(() => {});
      }
    } catch {}

    const onUnlocked = () => {
      setIsUnlocked(true);
      const s = localStorage.getItem("abgnt-reader-code") || "";
      setReaderCode(s);
    };
    window.addEventListener("abgnt-reader-unlocked", onUnlocked);
    return () => window.removeEventListener("abgnt-reader-unlocked", onUnlocked);
  }, []);

  // Freshly re-validate approved items on mount to guarantee real-time updates
  useEffect(() => {
    fetch(`/api/reviews?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => {
        if (d && d.success && !d.isAdmin) {
          setData({
            reviews: d.reviews || [],
            comments: d.comments || [],
            stats: d.stats || {
              averageRating: 0,
              totalRatings: 0,
              totalReviews: 0,
              totalComments: 0,
            },
          });
        }
      })
      .catch(() => {});
  }, []);

  // Form submission handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    if (!name.trim()) {
      setSubmitError("Please enter your name.");
      return;
    }

    if (!content.trim()) {
      setSubmitError("Please write your review or comment.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formType,
          name: name.trim(),
          role: role.trim() || undefined,
          mathBackground: mathBackground.trim() || undefined,
          hasBought,
          rating: formType === "review" ? rating : undefined,
          content: content.trim(),
          readerCode: readerCode || localStorage.getItem("abgnt-reader-code") || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setSubmitError(json.error || "Failed to submit. Please try again.");
      } else {
        setSubmitSuccess(true);
        setName("");
        setRole("");
        setMathBackground("");
        setContent("");
      }
    } catch {
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  // Scroll smoothly down to the review form
  function scrollToReviewForm(type: "review" | "comment" = "review") {
    setFormType(type);
    if (type === "review") {
      setHasBought(true);
    }
    const elem = document.getElementById("write-review");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        if (isUnlocked || localStorage.getItem("abgnt-reader-code")) {
          const input = document.getElementById("revName") as HTMLInputElement | null;
          if (input) input.focus();
        } else {
          const codeInputElem = document.getElementById("inlineCodeInput") as HTMLInputElement | null;
          if (codeInputElem) codeInputElem.focus();
        }
      }, 500);
    }
  }

  // Handle URL hash on mount (e.g. /reviews#write-review or /reviews#write)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#write-review" || hash === "#write" || hash === "#review") {
        setTimeout(() => {
          scrollToReviewForm("review");
        }, 600);
      } else if (hash === "#comment" || hash === "#comments") {
        setTimeout(() => {
          scrollToReviewForm("comment");
        }, 600);
      }
    }
  }, []);

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    const clean = codeInput.trim();
    if (!clean) return;

    try {
      const res = await fetch("/api/reviews/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: clean }),
      });
      const data = await res.json();
      if (data && data.valid) {
        localStorage.setItem("abgnt-reader-code", clean);
        setIsUnlocked(true);
        setReaderCode(clean);
        setUnlockModalOpen(false);
        setCodeError("");
        setTimeout(() => {
          const input = document.getElementById("revName") as HTMLInputElement | null;
          if (input) input.focus();
        }, 300);
      } else {
        setCodeError(
          data?.error || "Incorrect code. Please check the back of your book or scan the QR code."
        );
      }
    } catch {
      setCodeError("Network error. Please try again.");
    }
  }

  // Format date helper
  function formatDate(iso: string) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  }

  return (
    <>
      {/* Action Buttons Row */}
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
        <button
          type="button"
          className="primary-button"
          onClick={() => scrollToReviewForm("review")}
          title="Write a Review"
        >
          Write a Review <span>&darr;</span>
        </button>
        <button
          type="button"
          className="navy-button"
          onClick={() => scrollToReviewForm("comment")}
          title="Leave a Comment"
        >
          Leave a Comment <span>&darr;</span>
        </button>

        {isUnlocked && (
          <span className="reader-verified-status-tag" title="Unlocked via book QR code or reader access code">
            &#10003; Verified Reader Mode Active
          </span>
        )}
      </div>

      {/* Ratings Overview Summary Card */}
      <div className="reviews-summary-card" data-reveal>
        <div className="reviews-summary-score">
          <span className="summary-big-num">
            {data.stats.totalRatings > 0 ? data.stats.averageRating.toFixed(1) : "—"}
          </span>
          <div className="summary-stars-col">
            <div
              className="star-row"
              aria-label={
                data.stats.totalRatings > 0
                  ? `${data.stats.averageRating} out of 5 stars`
                  : "No ratings yet"
              }
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star-icon ${
                    data.stats.totalRatings > 0 && star <= Math.round(data.stats.averageRating)
                      ? "filled"
                      : "empty"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            {data.stats.totalRatings > 0 && (
              <span className="summary-total-label">
                Based on {data.stats.totalRatings} verified reader{" "}
                {data.stats.totalRatings === 1 ? "rating" : "ratings"}
              </span>
            )}
          </div>
        </div>

        <div className="reviews-summary-divider" />

        <div className="reviews-summary-metrics">
          <div className="summary-stat-box">
            <strong>{data.stats.totalReviews}</strong>
            <span>In-depth Reviews</span>
          </div>
          <div className="summary-stat-box">
            <strong>{data.stats.totalComments}</strong>
            <span>General Comments</span>
          </div>
          <div className="summary-stat-box">
            <strong>{data.stats.totalRatings > 0 ? "100%" : "—"}</strong>
            <span>Recommended</span>
          </div>
        </div>

        <div className="reviews-summary-actions">
          <button
            type="button"
            className="primary-button reviews-cta-btn"
            onClick={() => scrollToReviewForm("review")}
          >
            Review this Book <span>&darr;</span>
          </button>
        </div>
      </div>

      {/* Section Filter Tabs */}
      <div className="reviews-nav-tabs-row" data-reveal>
        <button
          type="button"
          className={`reviews-tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Items ({data.reviews.length + data.comments.length})
        </button>
        <button
          type="button"
          className={`reviews-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reader Reviews &amp; Ratings ({data.reviews.length})
        </button>
        <button
          type="button"
          className={`reviews-tab-btn ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          Discussion &amp; Comments ({data.comments.length})
        </button>
      </div>

      {/* SECTION 1: RATINGS & IN-DEPTH REVIEWS */}
      {(activeTab === "all" || activeTab === "reviews") && (
        <section className="reviews-sub-block" id="reviews-list" data-reveal>
          <div className="reviews-sub-header">
            <div>
              <span className="reviews-sub-tag">Section 1 &bull; Ratings &amp; Reviews</span>
              <h3 className="reviews-sub-title">Verified Reader Reviews</h3>
            </div>
            <button
              type="button"
              className="reviews-inline-btn"
              onClick={() => scrollToReviewForm("review")}
            >
              + Write a Review
            </button>
          </div>

          {data.reviews.length === 0 ? (
            <div className="reviews-empty-state">
              <p>No published reviews yet. Be the first reader to submit a review!</p>
              <button
                type="button"
                className="primary-button"
                onClick={() => scrollToReviewForm("review")}
              >
                Write the First Review <span>&darr;</span>
              </button>
            </div>
          ) : (
            <div className="reviews-grid">
              {data.reviews.map((rev) => (
                <article key={rev.id} className="review-card">
                  <div className="review-card-header">
                    <div>
                      <div className="review-author-row">
                        <h4 className="review-author-name">{rev.name}</h4>
                        {rev.hasBought && (
                          <span
                            className="review-badge verified"
                            title="Verified Reader: Has bought or read the book"
                          >
                            &#10003; Purchased Book
                          </span>
                        )}
                      </div>
                      {(rev.role || rev.mathBackground) && (
                        <p className="review-author-role">
                          {rev.role}
                          {rev.role && rev.mathBackground && " • "}
                          {rev.mathBackground}
                        </p>
                      )}
                    </div>

                    <div className="review-card-meta">
                      {rev.rating && (
                        <div
                          className="star-row review-stars"
                          aria-label={`${rev.rating} stars`}
                        >
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span
                              key={s}
                              className={`star-icon ${
                                s <= (rev.rating || 0) ? "filled" : "empty"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                      <time className="review-date">{formatDate(rev.createdAt)}</time>
                    </div>
                  </div>

                  <div
                    className="review-card-body"
                    dangerouslySetInnerHTML={{
                      __html: renderMathInText(rev.content),
                    }}
                  />
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECTION 2: COMMENTS & GENERAL DISCUSSION */}
      {(activeTab === "all" || activeTab === "comments") && (
        <section className="reviews-sub-block" id="comments-list" data-reveal>
          <div className="reviews-sub-header">
            <div>
              <span className="reviews-sub-tag">Section 2 &bull; Discussion</span>
              <h3 className="reviews-sub-title">Comments &amp; Inquiries</h3>
            </div>
            <button
              type="button"
              className="reviews-inline-btn"
              onClick={() => scrollToReviewForm("comment")}
            >
              + Post a Comment
            </button>
          </div>

          {data.comments.length === 0 ? (
            <div className="reviews-empty-state">
              <p>No comments posted yet. Have a question or note for the authors?</p>
              <button
                type="button"
                className="navy-button"
                onClick={() => scrollToReviewForm("comment")}
              >
                Post a Comment <span>&darr;</span>
              </button>
            </div>
          ) : (
            <div className="reviews-grid">
              {data.comments.map((com) => (
                <article key={com.id} className="review-card comment-card">
                  <div className="review-card-header">
                    <div>
                      <div className="review-author-row">
                        <h4 className="review-author-name">{com.name}</h4>
                        {com.hasBought ? (
                          <span className="review-badge verified">
                            &#10003; Purchased Book
                          </span>
                        ) : (
                          <span className="review-badge exploring">
                            Reader / Inquiry
                          </span>
                        )}
                      </div>
                      {(com.role || com.mathBackground) && (
                        <p className="review-author-role">
                          {com.role}
                          {com.role && com.mathBackground && " • "}
                          {com.mathBackground}
                        </p>
                      )}
                    </div>

                    <time className="review-date">{formatDate(com.createdAt)}</time>
                  </div>

                  <div
                    className="review-card-body"
                    dangerouslySetInnerHTML={{
                      __html: renderMathInText(com.content),
                    }}
                  />
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECTION 3: WRITE A REVIEW OR COMMENT (DESTINATION FOR WRITE A REVIEW) */}
      <section className="reviews-sub-block" id="write-review" data-reveal style={{ scrollMarginTop: "100px" }}>
        <div className="reviews-sub-header">
          <div>
            <span className="reviews-sub-tag">Section 3 &bull; Reader Submissions</span>
            <h3 className="reviews-sub-title">
              {formType === "review" ? "Write a Book Review" : "Post a Comment or Query"}
            </h3>
          </div>
          <div className="pill-choice-row" style={{ maxWidth: "380px" }}>
            <button
              type="button"
              className={`pill-choice-btn ${formType === "review" ? "selected" : ""}`}
              onClick={() => setFormType("review")}
            >
              Book Review &amp; Rating
            </button>
            <button
              type="button"
              className={`pill-choice-btn ${formType === "comment" ? "selected" : ""}`}
              onClick={() => setFormType("comment")}
            >
              General Comment / Query
            </button>
          </div>
        </div>

        <div className="write-review-card-wrapper">
          {submitSuccess ? (
            <div className="review-modal-success">
              <span className="success-icon">&#10003;</span>
              <h4>Thank You for Your Feedback!</h4>
              <p>
                Your submission has been securely delivered to authors Aritra Saha
                and Riddhiman Seal. To maintain academic quality and prevent spam,
                it will be published on this page once approved.
              </p>
              <button
                type="button"
                className="navy-button"
                style={{ marginTop: "24px" }}
                onClick={() => {
                  setSubmitSuccess(false);
                  setName("");
                  setRole("");
                  setMathBackground("");
                  setContent("");
                }}
              >
                Submit Another Feedback <span>&rarr;</span>
              </button>
            </div>
          ) : !isUnlocked ? (
            <div className="write-review-unlock-box">
              <span className="unlock-box-icon">🔒</span>
              <div className="unlock-box-header">
                <h4>Reader Verification Required</h4>
                <p>
                  To ensure genuine feedback, submitting reviews and comments is available exclusively to readers with the book. Enter the 4-character code printed on the back cover (or scan the QR code):
                </p>
              </div>
              <div className="unlock-box-subnote">
                <strong>Note:</strong> For readers who have bought our book, please message us over <strong>Discord</strong> (<code>aritra2008</code> or <code>simplisticformulas</code>), <strong>Telegram</strong> (<a href="https://t.me/Aritra2008Saha13" target="_blank" rel="noopener noreferrer" className="reader-note-link">@Aritra2008Saha13</a> or <a href="https://t.me/Sudeshna_Seal" target="_blank" rel="noopener noreferrer" className="reader-note-link">@Sudeshna_Seal</a>), or Gmail at{" "}
                <a href="mailto:abgnt.official@gmail.com" className="reader-note-link">abgnt.official@gmail.com</a> to receive the code for Reader verified messages and get access to our Discord channel.
              </div>
              <form onSubmit={handleVerifyCode} className="unlock-inline-form">
                <input
                  id="inlineCodeInput"
                  type="text"
                  placeholder="Enter 4-character code..."
                  value={codeInput}
                  onChange={(e) => {
                    setCodeInput(e.target.value);
                    setCodeError("");
                  }}
                  className="modal-text-input unlock-code-input"
                  maxLength={10}
                  autoCapitalize="none"
                  autoCorrect="off"
                />
                <button type="submit" className="primary-button">
                  Unlock Form <span>&rarr;</span>
                </button>
              </form>
              {codeError && <p className="code-error-msg">{codeError}</p>}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="review-modal-form">
              {/* Question: Did you buy the book? (Shown for reviews) */}
              {formType === "review" && (
                <div className="form-field-group purchase-question-box">
                  <label className="form-label">
                    Have you bought or read the book? <span className="req">*</span>
                  </label>
                  <div className="pill-choice-row">
                    <button
                      type="button"
                      className={`pill-choice-btn ${hasBought ? "selected" : ""}`}
                      onClick={() => setHasBought(true)}
                    >
                      &#10003; Yes, I own / read the book
                    </button>
                    <button
                      type="button"
                      className={`pill-choice-btn ${!hasBought ? "selected" : ""}`}
                      onClick={() => setHasBought(false)}
                    >
                      Not yet / Exploring
                    </button>
                  </div>
                  <span className="form-help-text">
                    {hasBought
                      ? "Your review will carry the 'Purchased Book' badge."
                      : "Open to prospective readers, students, and educators."}
                  </span>
                </div>
              )}

              {/* Rating (1 to 5 Stars) - Shown for reviews */}
              {formType === "review" && (
                <div className="form-field-group">
                  <label className="form-label">
                    Your Rating <span className="req">*</span>
                  </label>
                  <div className="interactive-stars-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-select-btn ${
                          star <= (hoverRating || rating) ? "active" : ""
                        }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        aria-label={`Rate ${star} out of 5 stars`}
                      >
                        &#9733;
                      </button>
                    ))}
                    <span className="star-selected-text">
                      {hoverRating || rating} / 5 &mdash;{" "}
                      {(hoverRating || rating) === 5
                        ? "Exceptional"
                        : (hoverRating || rating) === 4
                        ? "Very Good"
                        : (hoverRating || rating) === 3
                        ? "Good"
                        : (hoverRating || rating) === 2
                        ? "Fair"
                        : "Needs Improvement"}
                    </span>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div className="form-field-group">
                <label htmlFor="revName" className="form-label">
                  Your Full Name <span className="req">*</span>
                </label>
                <input
                  id="revName"
                  type="text"
                  required
                  maxLength={100}
                  placeholder="e.g., Rohan Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modal-text-input"
                />
              </div>

              {/* Status */}
              <div className="form-field-group">
                <label htmlFor="revRole" className="form-label">
                  Status <span className="opt">(Optional)</span>
                </label>
                <input
                  id="revRole"
                  type="text"
                  maxLength={100}
                  placeholder="e.g., Grade 11 Student, Math Educator"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="modal-text-input"
                />
              </div>

              {/* Math Background */}
              <div className="form-field-group">
                <label htmlFor="revMathBackground" className="form-label">
                  Math Background <span className="opt">(Optional)</span>
                </label>
                <input
                  id="revMathBackground"
                  type="text"
                  maxLength={100}
                  placeholder="e.g., RMO Awardee, INMO Awardee"
                  value={mathBackground}
                  onChange={(e) => setMathBackground(e.target.value)}
                  className="modal-text-input"
                />
              </div>

              {/* Review or Comment Content */}
              <div className="form-field-group">
                <label htmlFor="revContent" className="form-label">
                  {formType === "review" ? "Your Review" : "Your Comment / Query"}{" "}
                  <span className="req">*</span>
                </label>
                <textarea
                  id="revContent"
                  required
                  rows={5}
                  maxLength={3000}
                  placeholder={
                    formType === "review"
                      ? "Share your experience with the explanations, solved examples and Practice Problems."
                      : "Ask a question about prerequisites, chapters, or share a thought..."
                  }
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="modal-textarea"
                />
                <span className="form-help-text">
                  LaTeX math formulas enclosed in <code>$x^2 \equiv 1 \pmod p$</code> are supported.
                </span>
              </div>

              {/* Anti-spam notice */}
              <div className="review-moderation-notice">
                <span className="notice-dot" />
                <span>
                  Submissions are held for editorial approval by authors Aritra
                  Saha &amp; Riddhiman Seal before appearing on the website.
                </span>
              </div>

              {/* Submit Error */}
              {submitError && <div className="form-error-banner">{submitError}</div>}

              {/* Actions */}
              <div className="modal-submit-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="primary-button"
                  style={{ minWidth: "220px" }}
                >
                  {submitting
                    ? "Submitting..."
                    : formType === "review"
                    ? "Submit Review for Editorial Approval"
                    : "Post Comment for Approval"}{" "}
                  <span>&rarr;</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Reader QR Code Verification Modal */}
      {unlockModalOpen && (
        <div
          className="review-modal-backdrop"
          onClick={() => setUnlockModalOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="review-modal-window"
            style={{ maxWidth: "480px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="review-modal-header">
              <div>
                <span className="review-modal-tag">Book Reader Verification</span>
                <h3 className="review-modal-title">Enter Reader Code</h3>
              </div>
              <button
                type="button"
                className="review-modal-close"
                onClick={() => setUnlockModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="reader-unlock-modal-body">
              <p className="reader-unlock-desc">
                Review and discussion features are reserved for verified readers of
                <em> A Brief Guide to Number Theory</em>. Please enter the 4-character
                Reader Code found on the back cover of your book (or scan the QR code with your phone).
              </p>
              <div className="unlock-modal-contact-note">
                <strong>Note:</strong> For readers who have bought our book, please message us over <strong>Discord</strong> (<code>aritra2008</code> or <code>simplisticformulas</code>), <strong>Telegram</strong> (<a href="https://t.me/Aritra2008Saha13" target="_blank" rel="noopener noreferrer" className="reader-note-link">@Aritra2008Saha13</a> or <a href="https://t.me/Sudeshna_Seal" target="_blank" rel="noopener noreferrer" className="reader-note-link">@Sudeshna_Seal</a>), or Gmail at{" "}
                <a href="mailto:abgnt.official@gmail.com" className="reader-note-link">abgnt.official@gmail.com</a> to receive the code for Reader verified messages and get access to our Discord channel.
              </div>

              <form onSubmit={handleVerifyCode} className="reader-unlock-form">
                <div className="form-field-group">
                  <label htmlFor="readerCodeInput" className="form-label">
                    4-Character Reader Code <span className="req">*</span>
                  </label>
                  <input
                    id="readerCodeInput"
                    type="text"
                    required
                    maxLength={10}
                    placeholder="Enter code (case-sensitive)..."
                    value={codeInput}
                    onChange={(e) => {
                      setCodeInput(e.target.value);
                      setCodeError("");
                    }}
                    className="modal-text-input reader-code-input"
                    autoFocus
                  />
                  <span className="form-help-text">
                    Tip: Scanning the back cover QR code automatically unlocks this on your device.
                  </span>
                </div>

                {codeError && <div className="form-error-banner">{codeError}</div>}

                <div className="modal-submit-row" style={{ marginTop: "16px" }}>
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={() => setUnlockModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-button">
                    Verify &amp; Unlock <span>&rarr;</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
