import SkillForm from "@/components/admin/SkillForm";

const CreateSkillPage = () => {
  return (
    <section className="mx-auto max-w-2xl space-y-2">
      <div>
        <h1 className="text-2xl font-semibold">Create Skill</h1>
        <p className="text-sm opacity-80">
          Add a new skill with icon URL, category, and ordering.
        </p>
      </div>

      <SkillForm mode="create" />
    </section>
  );
};

export default CreateSkillPage;
