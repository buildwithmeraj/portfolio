const PageIntro = ({ title, description, className = "" }) => {
  return (
    <div className={`reveal space-y-3 ${className}`}>
      <h1 className="text-balance text-3xl font-black leading-tight md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 opacity-75 md:text-base">
          {description}
        </p>
      ) : null}
      <hr className="shimmer-divider" />
    </div>
  );
};

export default PageIntro;
