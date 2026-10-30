"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../Header";
import Footer from "../../Footer";
import MathBackground from "../../MathBackground";
import { ReviewItem } from "../../../lib/types";
import { renderMathInText } from "../../../lib/math-render";

export default function ModeratePage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [items, setItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [actionMessage, setActionMessage] = useState("");
  const [exportNotice, setExportNotice] = useState("");

  // Restore authenticated session from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("abgnt-admin-passcode");
    if (saved) {
      setPasscode(saved);
      fetchReviews(saved);
    }
  }, []);

  async function fetchReviews(key: string) {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/reviews", {
        headers: { "x-admin-passcode": key },
      });
      const data = await res.json();

      if (res.ok && data.isAdmin) {
        setIsAuthenticated(true);
        sessionStorage.setItem("abgnt-admin-passcode", key);
        setItems(data.items || []);
      } else {
        setAuthError("Incorrect admin passcode.");
        setIsAuthenticated(false);
        sessionStorage.removeItem("abgnt-admin-passcode");
      }
    } catch {
      setAuthError("Network error while connecting to moderation server.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!passcode.trim()) return;
    fetchReviews(passcode.trim());
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setPasscode("");
    sessionStorage.removeItem("abgnt-admin-passcode");
    setItems([]);
  }

  async function handleAction(id: string, action: "approve" | "reject" | "delete") {
    setActionMessage("");
    try {
      const res = await fetch("/api/reviews/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode,
          id,
          action,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setActionMessage(`Item marked as ${action}d successfully.`);
        // Refresh local items
        if (action === "delete") {
          setItems((prev) => prev.filter((i) => i.id !== id));
        } else {
          setItems((prev) =>
            prev.map((i) =>
              i.id === id ? { ...i, status: action === "approve" ? "approved" : "rejected" } : i
            )
          );
        }
      } else {
        setActionMessage(data.error || "Action failed.");
      }
    } catch {
      setActionMessage("Network error performing action.");
    }
  }

  function handleExportJson() {
    const approved = items.filter((i) => i.status === "approved");
    const jsonStr = JSON.stringify(approved, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setExportNotice(`Copied ${approved.length} approved items as JSON to clipboard!`);
    setTimeout(() => setExportNotice(""), 4000);
  }

  const counts = {
    pending: items.filter((i) => i.status === "pending").length,
    approved: items.filter((i) => i.status === "approved").length,
    rejected: items.filter((i) => i.status === "rejected").length,
    all: items.length,
  };

  const filteredItems = items.filter((i) => {
    if (filter === "all") return true;
    return i.status === filter;
  });

  return (
    <>
      <Header />
      <main id="top" style={{ paddingTop: "86px" }}>
        <section
          className="section moderate-section"
          style={{ minHeight: "calc(100vh - 86px)" }}
        >
          <MathBackground variant="light" />

          <div className="section-label">
            <span>M</span>
            <span>Editorial Moderation</span>
          </div>

          <div className="section-heading" data-reveal>
            <div>
              <h2>
                Editorial <em>Moderation.</em>
              </h2>
            </div>
            <p>
              Review pending reader feedback, inspect claims of book ownership,
              and approve comments or reviews for publication.
            </p>
          </div>

          {!isAuthenticated ? (
            /* Passcode Unlock Form */
            <div className="moderate-login-card" data-reveal>
              <span className="moderate-card-tag">Author Access Only</span>
              <h3 className="moderate-card-title">Enter Admin Passcode</h3>
              <p className="moderate-card-desc">
                Please enter the editorial passcode to review pending reader submissions.
              </p>

              <form onSubmit={handleLogin} className="moderate-login-form">
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="modal-text-input"
                  required
                  autoFocus
                />

                {authError && <div className="form-error-banner">{authError}</div>}

                <button
                  type="submit"
                  className="primary-button"
                  style={{ marginTop: "16px" }}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Unlock Dashboard"} <span>&rarr;</span>
                </button>
              </form>
            </div>
          ) : (
            /* Moderation Dashboard */
            <div className="moderate-dashboard" data-reveal>
              {/* Dashboard Action Header */}
              <div className="moderate-top-bar">
                <div className="moderate-stats-pills">
                  <span className={`mod-badge pending`}>
                    Pending: <strong>{counts.pending}</strong>
                  </span>
                  <span className={`mod-badge approved`}>
                    Approved: <strong>{counts.approved}</strong>
                  </span>
                  <span className={`mod-badge rejected`}>
                    Rejected: <strong>{counts.rejected}</strong>
                  </span>
                </div>

                <div className="moderate-header-actions">
                  <button
                    type="button"
                    className="navy-button"
                    onClick={handleExportJson}
                    title="Copy approved items as JSON"
                  >
                    Export Approved JSON <span>&darr;</span>
                  </button>
                  <Link className="navy-button" href="/reviews">
                    View Public Page <span>&rarr;</span>
                  </Link>
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </div>

              {exportNotice && (
                <div className="moderate-notice-banner">{exportNotice}</div>
              )}

              {actionMessage && (
                <div className="moderate-notice-banner">{actionMessage}</div>
              )}

              {/* Filter Tabs */}
              <div className="reviews-nav-tabs-row" style={{ marginTop: "24px" }}>
                <button
                  type="button"
                  className={`reviews-tab-btn ${filter === "pending" ? "active" : ""}`}
                  onClick={() => setFilter("pending")}
                >
                  Pending Review ({counts.pending})
                </button>
                <button
                  type="button"
                  className={`reviews-tab-btn ${filter === "approved" ? "active" : ""}`}
                  onClick={() => setFilter("approved")}
                >
                  Approved ({counts.approved})
                </button>
                <button
                  type="button"
                  className={`reviews-tab-btn ${filter === "rejected" ? "active" : ""}`}
                  onClick={() => setFilter("rejected")}
                >
                  Rejected ({counts.rejected})
                </button>
                <button
                  type="button"
                  className={`reviews-tab-btn ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All Items ({counts.all})
                </button>
              </div>

              {/* Items List */}
              {filteredItems.length === 0 ? (
                <div className="reviews-empty-state">
                  <p>No items found under the &quot;{filter}&quot; filter.</p>
                </div>
              ) : (
                <div className="moderate-items-list">
                  {filteredItems.map((item) => (
                    <article key={item.id} className={`moderate-card status-${item.status}`}>
                      <div className="moderate-card-header">
                        <div>
                          <div className="review-author-row">
                            <h4 className="review-author-name">{item.name}</h4>
                            <span className={`moderate-status-pill ${item.status}`}>
                              {item.status.toUpperCase()}
                            </span>
                            <span className="mod-type-pill">
                              {item.type === "review"
                                ? `Review (${item.rating || 5}★)`
                                : "General Comment"}
                            </span>
                            {item.hasBought ? (
                              <span className="review-badge verified">
                                &#10003; Purchased Book: YES
                              </span>
                            ) : (
                              <span className="review-badge exploring">
                                Purchased Book: NO
                              </span>
                            )}
                          </div>
                          {item.role && <p className="review-author-role">{item.role}</p>}
                        </div>

                        <div className="moderate-meta-right">
                          <time className="review-date">
                            {new Date(item.createdAt).toLocaleString()}
                          </time>
                        </div>
                      </div>

                      {/* Content with KaTeX math rendering */}
                      <div
                        className="review-card-body"
                        style={{ marginTop: "16px", marginBottom: "20px" }}
                        dangerouslySetInnerHTML={{
                          __html: renderMathInText(item.content),
                        }}
                      />

                      {/* Action buttons */}
                      <div className="moderate-card-actions">
                        {item.status !== "approved" && (
                          <button
                            type="button"
                            className="mod-action-btn approve"
                            onClick={() => handleAction(item.id, "approve")}
                          >
                            &#10003; Approve
                          </button>
                        )}

                        {item.status !== "rejected" && (
                          <button
                            type="button"
                            className="mod-action-btn reject"
                            onClick={() => handleAction(item.id, "reject")}
                          >
                            &#10005; Reject
                          </button>
                        )}

                        <button
                          type="button"
                          className="mod-action-btn delete"
                          onClick={() => {
                            if (window.confirm("Permanently delete this submission?")) {
                              handleAction(item.id, "delete");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
