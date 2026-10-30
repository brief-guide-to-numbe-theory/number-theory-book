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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "reviews" | "comments">("all");

  // Reader QR Code verification states (Code: F6z@)
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
  const [content, setContent] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Check reader unlock state on mount and from QR link
  useEffect(() => {
    // 1. Check localStorage
    const saved = localStorage.getItem("abgnt-reader-code");
    if (saved && saved.trim() === "F6z@") {
      setIsUnlocked(true);
      setReaderCode("F6z@");
    }

    // 2. Check query parameter (?code=F6z@ or ?code=F6z%40)
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (code && (code.trim() === "F6z@" || decodeURIComponent(code).trim() === "F6z@")) {
        localStorage.setItem("abgnt-reader-code", "F6z@");
        setIsUnlocked(true);
        setReaderCode("F6z@");

        // Clean query parameter from URL bar
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
      }
    } catch {}

    const onUnlocked = () => {
      setIsUnlocked(true);
      setReaderCode("F6z@");
    };
    window.addEventListener("abgnt-reader-unlocked", onUnlocked);
    return () => window.removeEventListener("abgnt-reader-unlocked", onUnlocked);
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
        setContent("");
      }
    } catch {
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  // Request modal: checks if reader is unlocked via QR or code
  function requestOpenModal(type: "review" | "comment", boughtDefault: boolean = true) {
    if (isUnlocked) {
      handleOpenModal(type, boughtDefault);
    } else {
      setPendingActionType(type);
      setCodeInput("");
      setCodeError("");
      setUnlockModalOpen(true);
    }
  }

  function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    const clean = codeInput.trim();
    if (clean === "F6z@") {
      localStorage.setItem("abgnt-reader-code", "F6z@");
      setIsUnlocked(true);
      setReaderCode("F6z@");
      setUnlockModalOpen(false);
      handleOpenModal(pendingActionType, pendingActionType === "review");
    } else {
      setCodeError("Incorrect code. Please check the back of your book or scan the QR code.");
    }
  }

  function handleOpenModal(type: "review" | "comment", boughtDefault: boolean = true) {
    setFormType(type);
    setHasBought(boughtDefault);
    setSubmitSuccess(false);
    setSubmitError("");
    setIsModalOpen(true);
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
          onClick={() => requestOpenModal("review", true)}
          title={isUnlocked ? "Write a Review" : "Reader Verification Required (Code from back cover)"}
        >
          Write a Review {isUnlocked ? <span>&rarr;</span> : <span className="btn-lock-tag">🔒 Code Required</span>}
        </button>
        <button
          type="button"
          className="navy-button"
          onClick={() => requestOpenModal("comment", false)}
          title={isUnlocked ? "Leave a Comment" : "Reader Verification Required (Code from back cover)"}
        >
          Leave a Comment {isUnlocked ? <span>&rarr;</span> : <span className="btn-lock-tag">🔒 Code Required</span>}
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
            onClick={() => requestOpenModal("review", true)}
          >
            Review this Book <span>&rarr;</span>
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
              onClick={() => requestOpenModal("review", true)}
            >
              + Submit a Review
            </button>
          </div>

          {data.reviews.length === 0 ? (
            <div className="reviews-empty-state">
              <p>No published reviews yet. Be the first reader to submit a review!</p>
              <button
                type="button"
                className="primary-button"
                onClick={() => requestOpenModal("review", true)}
              >
                Write the First Review <span>&rarr;</span>
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
                      {rev.role && <p className="review-author-role">{rev.role}</p>}
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
              onClick={() => requestOpenModal("comment", false)}
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
                onClick={() => requestOpenModal("comment", false)}
              >
                Post a Comment <span>&rarr;</span>
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
                      {com.role && <p className="review-author-role">{com.role}</p>}
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

      {/* SUBMISSION MODAL */}
      {isModalOpen && (
        <div
          className="review-modal-backdrop"
          onClick={() => !submitting && setIsModalOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="review-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="review-modal-header">
              <div>
                <span className="review-modal-tag">Reader Feedback</span>
                <h3 className="review-modal-title">
                  {formType === "review" ? "Submit a Book Review" : "Post a Comment"}
                </h3>
              </div>
              <button
                type="button"
                className="review-modal-close"
                onClick={() => !submitting && setIsModalOpen(false)}
                aria-label="Close form"
              >
                &times;
              </button>
            </div>

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
                  className="primary-button"
                  style={{ marginTop: "24px" }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Return to Reviews <span>&rarr;</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="review-modal-form">
                {/* Type Switcher */}
                <div className="form-field-group">
                  <label className="form-label">Submission Category</label>
                  <div className="pill-choice-row">
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

                {/* Question: Did you buy the book? */}
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
                          ★
                        </button>
                      ))}
                      <span className="star-selected-text">
                        {rating === 5 && "5 / 5 — Exceptional"}
                        {rating === 4 && "4 / 5 — Very Good"}
                        {rating === 3 && "3 / 5 — Good"}
                        {rating === 2 && "2 / 5 — Fair"}
                        {rating === 1 && "1 / 5 — Poor"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Name */}
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

                {/* Role / Affiliation */}
                <div className="form-field-group">
                  <label htmlFor="revRole" className="form-label">
                    Role / Affiliation <span className="opt">(Optional)</span>
                  </label>
                  <input
                    id="revRole"
                    type="text"
                    maxLength={100}
                    placeholder="e.g., INMO Awardee, Grade 11 Student, Math Educator"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
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
                        ? "Share your experience with the explanations, practice problems, or 500 hints..."
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

                {submitError && <div className="form-error-banner">{submitError}</div>}

                {/* Submit Row */}
                <div className="modal-submit-row">
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="primary-button"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit for Approval"} <span>&rarr;</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
