const EmptyState = ({ message, className = "", centered = false }) => {
  return (
    <div
      className={`reveal rounded-2xl border border-dashed border-base-300 bg-base-100/70 p-6 ${
        centered ? "text-center" : ""
      } ${className}`}
    >
      <p className="opacity-75">{message}</p>
    </div>
  );
};

export default EmptyState;
