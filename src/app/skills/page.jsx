import EmptyState from "@/components/shared/EmptyState";
import PageIntro from "@/components/shared/PageIntro";
import SkillsGrid from "@/components/skills/SkillsGrid";
import { getSkills } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const SkillsPage = async () => {
  const skills = await getSkills();

  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <PageIntro
        title="All Skills"
        description="Complete list of my technical skills."
      />

      {!skills.length ? <EmptyState message="No skills found." /> : <SkillsGrid skills={skills} />}
    </section>
  );
};

export default SkillsPage;
