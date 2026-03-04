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
      <progress
        className="progress progress-primary h-2 w-full"
        value={skill.level}
        max="100"
      />
      <p className="mt-2 text-sm opacity-80">{skill.level}% proficiency</p>
    </article>
  );
};

export default SkillCard;
