import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

async function getProject(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDb();
  const project = await db
    .collection("projects")
    .findOne({ _id: new ObjectId(id) });
  if (!project) {
    return null;
  }

  return {
    ...project,
    _id: project._id.toString(),
    skillIds: Array.isArray(project.skillIds) ? project.skillIds : [],
  };
}

const EditProjectPage = async ({ params }) => {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams?.id);
  if (!project) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-2xl space-y-2">
      <div>
        <h1 className="text-2xl font-semibold">Edit Project</h1>
        <p className="text-sm opacity-80">
          Update project details and linked skills.
        </p>
      </div>
      <ProjectForm mode="edit" projectId={project._id} initialData={project} />
    </section>
  );
};

export default EditProjectPage;
