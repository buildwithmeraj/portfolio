import SkillCard from "@/components/skills/SkillCard";

const SkillsGrid = ({ skills }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill._id} skill={skill} />
      ))}
    </div>
  );
};

export default SkillsGrid;
