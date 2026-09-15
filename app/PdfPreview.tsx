"use client";

import { useState } from "react";
import Image from "next/image";

const TOTAL_PAGES = 20;

export default function PdfPreview() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"scroll" | "pages">("scroll");

  const pageNumbers = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  return (
    <div className="pdf-preview-container">
      <p className="pdf-preview-text">
        We are also attaching the chapter 3.1 (Orders) as a preview of the book.
      </p>

      <div className="pdf-viewer-wrapper">
        <div className="pdf-viewer-header">
          <div className="pdf-header-title">
            <span>Chapter 3.1: Orders (Preview)</span>
          </div>

          <div className="pdf-header-controls">
            <div className="pdf-mode-tabs">
              <button
                type="button"
                className={`pdf-tab-btn ${viewMode === "scroll" ? "active" : ""}`}
                onClick={() => setViewMode("scroll")}
                title="Continuous Document View"
              >
                All Pages
              </button>
              <button
                type="button"
                className={`pdf-tab-btn ${viewMode === "pages" ? "active" : ""}`}
                onClick={() => setViewMode("pages")}
                title="Page by Page View"
              >
                Page View
              </button>
            </div>

            <a
              href="/chapter-3-1-orders.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="navy-button pdf-download-btn"
            >
              Open Original PDF <span>&rarr;</span>
            </a>
          </div>
        </div>

        {viewMode === "pages" && (
          <div className="pdf-pagination-bar">
            <button
              type="button"
              className="pdf-nav-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              &larr; Previous
            </button>
            <span className="pdf-page-indicator">
              Page <strong>{currentPage}</strong> of {TOTAL_PAGES}
            </span>
            <button
              type="button"
              className="pdf-nav-btn"
              disabled={currentPage >= TOTAL_PAGES}
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            >
              Next &rarr;
            </button>
          </div>
        )}

        {viewMode === "scroll" && (
          <div className="pdf-scroll-body">
            {pageNumbers.map((num) => (
              <div key={num} className="pdf-page-frame">
                <div className="pdf-page-number-tag">Page {num}</div>
                <Image
                  src={`/chapter3_preview/page-${num}.png`}
                  alt={`Chapter 3.1 Orders Page ${num}`}
                  width={874}
                  height={1150}
                  className="pdf-page-img"
                  priority={num <= 2}
                />
              </div>
            ))}
          </div>
        )}

        {viewMode === "pages" && (
          <div className="pdf-single-page-body">
            <div className="pdf-page-frame">
              <Image
                src={`/chapter3_preview/page-${currentPage}.png`}
                alt={`Chapter 3.1 Orders Page ${currentPage}`}
                width={874}
                height={1150}
                className="pdf-page-img"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
