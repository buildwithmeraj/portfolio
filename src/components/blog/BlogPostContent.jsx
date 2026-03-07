"use client";

import { useEffect, useRef } from "react";

const BlogPostContent = ({ html }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function highlightCodeBlocks() {
      const root = containerRef.current;
      if (!root) {
        return;
      }

      const codeBlocks = root.querySelectorAll("pre code");
      if (!codeBlocks.length) {
        return;
      }

      const hljs = (await import("highlight.js")).default;
      if (cancelled) {
        return;
      }

      codeBlocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    }

    highlightCodeBlocks();
    return () => {
      cancelled = true;
    };
  }, [html]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default BlogPostContent;
