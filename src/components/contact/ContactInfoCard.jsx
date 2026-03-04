const ContactInfoCard = ({ href, icon: Icon, label, value }) => {
  return (
    <a
      href={href}
      className="reveal flex flex-1 items-start gap-4 rounded-2xl border border-base-300/90 bg-base-100/80 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
    >
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{label}</h3>
        <p className="break-all text-sm opacity-70">{value}</p>
      </div>
    </a>
  );
};

export default ContactInfoCard;
