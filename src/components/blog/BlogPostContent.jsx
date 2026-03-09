"use client";

import { useEffect, useRef } from "react";

const BlogPostContent = ({ html }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function enhanceContent() {
      const root = containerRef.current;
      if (!root) {
        return;
      }

      const codeBlocks = root.querySelectorAll("pre code");
      if (codeBlocks.length) {
        const hljs = (await import("highlight.js")).default;
        if (cancelled) {
          return;
        }

        codeBlocks.forEach((block) => {
          hljs.highlightElement(block);
        });
      }

      const links = root.querySelectorAll("a[href]");
      links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        if (!href) {
          return;
        }

        const isExternal =
          /^https?:\/\//i.test(href) || href.startsWith("//") || href.startsWith("www.");

        if (isExternal) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noreferrer noopener");
          link.classList.add("external-link");
        }
      });
    }

    enhanceContent();
    return () => {
      cancelled = true;
    };
  }, [html]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default BlogPostContent;
