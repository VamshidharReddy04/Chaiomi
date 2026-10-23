import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Styles/legal.css";

// Splits a line of text into plain text, **bold** parts and email links.
const INLINE_PATTERN = /(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
const EMAIL_PATTERN = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/;

function renderInline(text) {
  return text
    .split(INLINE_PATTERN)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (EMAIL_PATTERN.test(part)) {
        return (
          <a key={index} href={`mailto:${part}`}>
            {part}
          </a>
        );
      }
      return part;
    });
}

// Draws one content block (paragraph, sub-heading, list or table).
function Block({ block }) {
  switch (block.t) {
    case "h3":
      return <h3 className="legal-subtitle">{block.x}</h3>;
    case "ul":
      return (
        <ul className="legal-list">
          {block.x.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="legal-list legal-list-numbered">
          {block.x.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                {block.head.map((heading) => (
                  <th key={heading} scope="col">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return <p className="legal-text">{renderInline(block.x)}</p>;
  }
}

// Shared layout for the Privacy Policy and Terms of Service pages.
// Pass the content object from src/data (title, dates, sections).
function LegalPage({ doc }) {
  const { hash } = useLocation();

  // Give the page its own browser-tab title, and restore it when leaving
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${doc.title} | Chaiomi`;
    return () => {
      document.title = previousTitle;
    };
  }, [doc.title]);

  // Jump to a section when the address has a #hash (for example /privacy#cookies).
  // The short delay lets the app's scroll-to-top run first.
  useEffect(() => {
    if (!hash) return undefined;
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }, 150);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="legal-container">
          <Link to="/" className="legal-back">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Home
          </Link>

          <header className="legal-header">
            <h1 className="legal-title">{doc.title}</h1>
            <p className="legal-meta">
              Effective Date: {doc.effectiveDate} · Last Updated:{" "}
              {doc.lastUpdated} · Version: {doc.version}
              {doc.documentId ? ` · Document ID: ${doc.documentId}` : ""}
            </p>
          </header>

          {/* Table of contents */}
          <nav className="legal-toc" aria-label={`${doc.title} contents`}>
            <h2 className="legal-toc-title">On this page</h2>
            <ul className="legal-toc-list">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="legal-toc-link">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="legal-article">
            {doc.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`} className="legal-section-title">
                  {section.title}
                </h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default LegalPage;
