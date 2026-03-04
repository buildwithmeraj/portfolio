import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import SkillForm from "@/components/admin/SkillForm";
import { getDb } from "@/lib/db";

async function getSkill(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDb();
  const skill = await db
    .collection("skills")
    .findOne({ _id: new ObjectId(id) });

  if (!skill) {
    return null;
  }

  return {
    ...skill,
    _id: skill._id.toString(),
  };
}

const EditSkillPage = async ({ params }) => {
  const resolvedParams = await params;
  const skill = await getSkill(resolvedParams?.id);
  if (!skill) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-2xl space-y-2">
      <div>
        <h1 className="text-2xl font-semibold">Edit Skill</h1>
        <p className="text-sm opacity-80">
          Update name, icon, category, level, and order.
        </p>
      </div>

      <SkillForm mode="edit" skillId={skill._id} initialData={skill} />
    </section>
  );
};

export default EditSkillPage;
