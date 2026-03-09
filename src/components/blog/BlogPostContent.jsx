"use client";

import { useEffect, useRef } from "react";

const EXTERNAL_LINK_REGEX =
  /^(?:https?:\/\/|\/\/|www\.|(?:[a-z0-9-]+\.)+[a-z]{2,})(?:[/?#:].*)?$/i;
const PLAIN_URL_REGEX =
  /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+|(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?:\/[^\s<>"']*)?)/gi;

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

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const textNodes = [];

      let currentNode = walker.nextNode();
      while (currentNode) {
        const parentTag = currentNode.parentElement?.tagName?.toLowerCase();
        const skipNode =
          !currentNode.nodeValue?.trim() ||
          ["a", "code", "pre", "script", "style", "textarea"].includes(parentTag || "");

        if (!skipNode) {
          textNodes.push(currentNode);
        }

        currentNode = walker.nextNode();
      }

      textNodes.forEach((textNode) => {
        const text = textNode.nodeValue || "";
        PLAIN_URL_REGEX.lastIndex = 0;
        if (!PLAIN_URL_REGEX.test(text)) {
          return;
        }

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        PLAIN_URL_REGEX.lastIndex = 0;
        let match = PLAIN_URL_REGEX.exec(text);

        while (match) {
          const matchedUrl = match[0];
          const start = match.index;
          const end = start + matchedUrl.length;
          const prevChar = start > 0 ? text[start - 1] : "";

          if (prevChar === "@") {
            fragment.appendChild(document.createTextNode(matchedUrl));
            lastIndex = end;
            match = PLAIN_URL_REGEX.exec(text);
            continue;
          }

          if (start > lastIndex) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));
          }

          const anchor = document.createElement("a");
          const href =
            matchedUrl.startsWith("http://") ||
            matchedUrl.startsWith("https://") ||
            matchedUrl.startsWith("//")
              ? matchedUrl
              : `https://${matchedUrl}`;
          anchor.href = href;
          anchor.textContent = matchedUrl;
          fragment.appendChild(anchor);

          lastIndex = end;
          match = PLAIN_URL_REGEX.exec(text);
        }

        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        textNode.parentNode?.replaceChild(fragment, textNode);
      });

      const links = root.querySelectorAll("a[href]");
      links.forEach((link) => {
        const href = (link.getAttribute("href") || "").trim();
        if (!href) {
          return;
        }

        const isExternal = EXTERNAL_LINK_REGEX.test(href);

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
