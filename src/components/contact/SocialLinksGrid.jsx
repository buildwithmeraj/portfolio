import Link from "next/link";

const SocialLinksGrid = ({ links }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {links.map((social) => {
        const Icon = social.icon;

        return (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="reveal flex flex-col items-center gap-2 rounded-xl border border-base-300/90 bg-base-100/70 p-3 transition duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-content"
            title={social.label}
          >
            <Icon className="size-5" />
            <span className="line-clamp-1 text-center text font-bold">
              {social.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default SocialLinksGrid;
