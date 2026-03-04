"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to send message.");
      }

      toast.success("Message sent successfully");
      setForm(initialState);
    } catch (error) {
      toast.error(error.message || "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="reveal surface-card space-y-5 p-6">
      <h2 className="text-2xl font-bold text-base-content">Send a Message</h2>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">Name</span>
        <input
          className="input input-bordered w-full text-sm focus:border-primary focus:outline-none"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Your name"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">Email</span>
        <input
          type="email"
          className="input input-bordered w-full text-sm focus:border-primary focus:outline-none"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">Subject</span>
        <input
          className="input input-bordered w-full text-sm focus:border-primary focus:outline-none"
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          placeholder="Project discussion"
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">Message</span>
        <textarea
          className="textarea textarea-bordered min-h-32 w-full text-sm focus:border-primary focus:outline-none"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Write your message..."
          required
        />
      </label>

      <button className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={isSubmitting}>
        <IoSend />
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
