"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FiBold,
  FiCode,
  FiGrid,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
} from "react-icons/fi";
import { TfiListOl } from "react-icons/tfi";
import { FaHeading } from "react-icons/fa";

const BlogEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const savedRangeRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  function exec(command, arg = null) {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    onChange(editorRef.current?.innerHTML || "");
  }

  function handleInput() {
    onChange(editorRef.current?.innerHTML || "");
  }

  function preserveSelection(event) {
    event.preventDefault();
  }

  function openLinkModal() {
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      const editor = editorRef.current;
      if (editor && editor.contains(range.commonAncestorContainer)) {
        savedRangeRef.current = range.cloneRange();
      }
    }

    const selectedText = selection?.toString()?.trim() || "";
    setLinkText(selectedText);
    setLinkUrl("");
    setIsLinkModalOpen(true);
  }

  function closeLinkModal() {
    setIsLinkModalOpen(false);
    setLinkText("");
    setLinkUrl("");
  }

  function normalizeUrl(url) {
    const trimmed = url.trim();
    if (!trimmed) {
      return "";
    }
    if (/^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  }

  function handleLinkSubmit(event) {
    event.preventDefault();

    const text = linkText.trim();
    const rawUrl = linkUrl.trim();
    if (!text || !rawUrl) {
      toast.error("Both link text and URL are required.");
      return;
    }

    const href = normalizeUrl(rawUrl);
    if (!href) {
      toast.error("Please provide a valid URL.");
      return;
    }

    const editor = editorRef.current;
    if (!editor) {
      toast.error("Editor is not ready.");
      return;
    }

    editor.focus();

    const selection = window.getSelection();
    selection?.removeAllRanges();

    let range = savedRangeRef.current;
    if (!range || !editor.contains(range.commonAncestorContainer)) {
      range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
    }

    selection?.addRange(range);

    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = text;

    range.deleteContents();
    range.insertNode(anchor);

    const spaceNode = document.createTextNode(" ");
    anchor.parentNode?.insertBefore(spaceNode, anchor.nextSibling);

    const caretRange = document.createRange();
    caretRange.setStartAfter(spaceNode);
    caretRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(caretRange);

    onChange(editor.innerHTML);
    closeLinkModal();
  }

  function handleInsertTable() {
    const rows = Number(window.prompt("How many rows?", "2"));
    const cols = Number(window.prompt("How many columns?", "2"));

    if (!rows || !cols || rows < 1 || cols < 1) {
      toast.error("Rows and columns must be at least 1.");
      return;
    }

    const tableRows = Array.from({ length: rows })
      .map(
        (_, rowIndex) =>
          `<tr>${Array.from({ length: cols })
            .map((_, colIndex) =>
              rowIndex === 0
                ? `<th style="border:1px solid #ccc;padding:8px;">Header ${colIndex + 1}</th>`
                : `<td style="border:1px solid #ccc;padding:8px;">Cell</td>`,
            )
            .join("")}</tr>`,
      )
      .join("");

    const tableHtml = `<table style="border-collapse:collapse;width:100%;margin:12px 0;"><tbody>${tableRows}</tbody></table><p></p>`;
    exec("insertHTML", tableHtml);
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function handleInsertCodeBlock() {
    const selectedText = window.getSelection()?.toString() || "";
    const code = selectedText || "const hello = 'world';";
    const codeHtml = `<pre><code>${escapeHtml(code)}</code></pre><p></p>`;
    exec("insertHTML", codeHtml);
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("image", file);

      const response = await fetch("/api/admin/uploads/imgbb", {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (!response.ok || !result?.url) {
        throw new Error(result?.message || "Image upload failed.");
      }

      exec("insertImage", result.url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={() => exec("bold")}
        >
          <FiBold className="size-4" />
          Bold
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={() => exec("italic")}
        >
          <FiItalic className="size-4" />
          Italic
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={openLinkModal}
        >
          <FiLink className="size-4" />
          Link
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={() => exec("formatBlock", "H1")}
        >
          <FaHeading className="size-4" />
          H1
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={() => exec("formatBlock", "H2")}
        >
          <FaHeading className="size-4" />
          H2
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={() => exec("formatBlock", "H3")}
        >
          <FaHeading className="size-4" />
          H3
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={() => exec("formatBlock", "P")}
        >
          P
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={() => exec("insertUnorderedList")}
        >
          <FiList className="size-4" />
          List
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={() => exec("insertOrderedList")}
        >
          <TfiListOl className="size-4" />
          Ordered
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={handleInsertTable}
        >
          <FiGrid className="size-4" />
          Table
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={handleInsertCodeBlock}
        >
          <FiCode className="size-4" />
          Code
        </button>
        <button
          type="button"
          className="btn btn-xs btn-soft"
          onMouseDown={preserveSelection}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <FiImage className="size-4" />
          {isUploading ? "Uploading..." : "Image"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="blog-editor-content min-h-56 rounded-xl border border-base-300 bg-base-100 p-4 outline-none focus:border-primary"
        onInput={handleInput}
        suppressContentEditableWarning
      />
      <p className="text-xs opacity-70">
        Tip: paste text, then use toolbar for formatting and image upload.
      </p>

      {isLinkModalOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleLinkSubmit}
            className="w-full max-w-md space-y-4 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-xl"
          >
            <h3 className="text-lg font-semibold">Insert Link</h3>

            <label className="form-control w-full">
              <span className="label-text mb-1">Text</span>
              <input
                className="input input-bordered w-full"
                value={linkText}
                onChange={(event) => setLinkText(event.target.value)}
                placeholder="Clickable text"
                required
                autoFocus
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">URL</span>
              <input
                className="input input-bordered w-full"
                value={linkUrl}
                onChange={(event) => setLinkUrl(event.target.value)}
                placeholder="https://example.com"
                required
              />
            </label>

            <div className="flex justify-end gap-2 pt-1">
              <button type="button" className="btn btn-ghost" onClick={closeLinkModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Link
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default BlogEditor;
