import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const SectionTitle = ({ title, href, actionLabel = "View all" }) => {
  return (
    <div className="reveal flex items-center justify-between gap-3">
      <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
      {href ? (
        <Link href={href} className="btn btn-sm btn-secondary btn-soft">
          {actionLabel}
          <FiArrowUpRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
};

export default SectionTitle;
