"use client";

import { useState } from "react";

interface SpoilerTextProps {
  children: React.ReactNode;
}

export default function SpoilerText({ children }: SpoilerTextProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <span
      className={`spoiler-tag ${isRevealed ? "is-revealed" : "is-hidden"}`}
      onClick={() => setIsRevealed((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsRevealed((prev) => !prev);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isRevealed}
      title={isRevealed ? "Click to hide spoiler" : "Click to view spoiler"}
    >
      <span className="spoiler-inner-text">{children}</span>
      {!isRevealed && (
        <span className="spoiler-mask-label" aria-hidden="true">
          Spoiler <span>(click to view)</span>
        </span>
      )}
    </span>
  );
}
