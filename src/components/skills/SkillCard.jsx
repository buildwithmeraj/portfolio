const SkillCard = ({ skill }) => {
  return (
    <article className="reveal rounded-2xl border border-base-300/90 bg-base-100/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.iconUrl}
          alt={`${skill.name} icon`}
          className="h-10 w-10 rounded-md object-contain"
        />
        <div>
          <h3 className="font-semibold">{skill.name}</h3>
          <p className="text-xs opacity-70">{skill.category}</p>
        </div>
      </div>
    </article>
  );
};

export default SkillCard;
