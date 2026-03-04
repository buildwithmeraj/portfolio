"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiLock, FiUser } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const AdminLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.message || "Invalid username or password.");
        throw new Error(data?.message || "Login failed.");
      }

      toast.success("Login successful");
      router.replace(nextPath || "/admin");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Unable to login.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-3 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
    >
      <h1 className="text-center text-3xl font-bold text-base-content">
        Admin Login
      </h1>
      {error && (
        <div className="alert alert-error alert-soft">
          <MdCancel className="-mr-2" />
          {error}
        </div>
      )}
      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Username
        </span>
        <div className="input input-bordered flex items-center gap-2 text-sm focus-within:border-primary">
          <FiUser className="size-4" />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            value={form.username}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, username: event.target.value }))
            }
            autoComplete="username"
            required
          />
        </div>
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Password
        </span>
        <div className="input input-bordered flex items-center gap-2 text-sm focus-within:border-primary">
          <FiLock className="size-4" />
          <input
            type="password"
            className="grow"
            value={form.password}
            placeholder="Password"
            onChange={(event) =>
              setForm((prev) => ({ ...prev, password: event.target.value }))
            }
            autoComplete="current-password"
            required
          />
        </div>
      </label>

      <button
        className="btn btn-primary w-full text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={isSubmitting}
      >
        <FaSignInAlt className="mt-0.5" />
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default AdminLoginForm;
