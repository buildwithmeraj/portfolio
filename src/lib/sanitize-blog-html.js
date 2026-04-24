import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "blockquote",
  "pre",
  "code",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "hr",
  "span",
  "div",
];

const allowedAttributes = {
  a: ["href", "name", "target", "rel"],
  img: ["src", "alt", "title", "width", "height", "loading"],
  th: ["style", "colspan", "rowspan"],
  td: ["style", "colspan", "rowspan"],
  table: ["style"],
  span: ["style"],
  div: ["style"],
  p: ["style"],
};

const allowedStyles = {
  "*": {
    "text-align": [/^(left|right|center|justify)$/],
  },
  table: {
    "border-collapse": [/^collapse$/],
    width: [/^\d+(%|px)?$/, /^100%$/],
    margin: [/^\d+px(\s+\d+px){0,3}$/],
  },
  th: {
    border: [/^[0-9]+px\s+solid\s+#[0-9a-fA-F]{3,8}$/],
    padding: [/^\d+px$/],
  },
  td: {
    border: [/^[0-9]+px\s+solid\s+#[0-9a-fA-F]{3,8}$/],
    padding: [/^\d+px$/],
  },
};

export function sanitizeBlogHtml(html) {
  return sanitizeHtml(html || "", {
    allowedTags,
    allowedAttributes,
    allowedStyles,
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noreferrer noopener",
      }),
    },
  });
}
