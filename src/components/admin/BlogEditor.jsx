"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FiBold,
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
  const [isUploading, setIsUploading] = useState(false);

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

  function handleAddLink() {
    const url = window.prompt("Enter URL");
    if (!url) {
      return;
    }
    exec("createLink", url);
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
          onClick={handleAddLink}
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
    </div>
  );
};

export default BlogEditor;
