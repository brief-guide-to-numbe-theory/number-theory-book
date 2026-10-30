import katex from "katex";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Safely renders plain text with KaTeX formulas enclosed in $...$ (inline) or $$...$$ (display).
 * Regular text is properly escaped to prevent XSS.
 */
export function renderMathInText(rawText: string): string {
  if (!rawText) return "";

  // Split by $$...$$ (display) and $...$ (inline)
  // Pattern matches $$...$$ or $...$
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  const parts = rawText.split(regex);

  return parts
    .map((part) => {
      if (part.startsWith("$$") && part.endsWith("$$") && part.length >= 4) {
        const math = part.slice(2, -2).trim();
        try {
          return katex.renderToString(math, {
            displayMode: true,
            throwOnError: false,
          });
        } catch {
          return `<code>${escapeHtml(part)}</code>`;
        }
      } else if (part.startsWith("$") && part.endsWith("$") && part.length >= 2) {
        const math = part.slice(1, -1).trim();
        try {
          return katex.renderToString(math, {
            displayMode: false,
            throwOnError: false,
          });
        } catch {
          return `<code>${escapeHtml(part)}</code>`;
        }
      } else {
        // Plain text: escape HTML and convert newlines to <br />
        return escapeHtml(part).replace(/\n/g, "<br />");
      }
    })
    .join("");
}
