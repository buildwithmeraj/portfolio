"use client";

const DeleteConfirmModal = ({
  open,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  isLoading = false,
  onCancel,
  onConfirm,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl"
      >
        <h3 className="text-lg font-bold text-base-content">{title}</h3>
        <p className="mt-2 text-sm text-base-content/80">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-error text-white disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
