import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import ResumeForm from "@/components/admin/ResumeForm";

async function getResume(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDb();
  const resume = await db
    .collection("resumes")
    .findOne({ _id: new ObjectId(id) });
  if (!resume) {
    return null;
  }

  return {
    ...resume,
    _id: resume._id.toString(),
  };
}

const EditResumePage = async ({ params }) => {
  const resolvedParams = await params;
  const resume = await getResume(resolvedParams?.id);
  if (!resume) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-xl space-y-2">
      <h1 className="text-2xl font-semibold">Edit Resume</h1>
      <ResumeForm mode="edit" resumeId={resume._id} initialData={resume} />
    </section>
  );
};

export default EditResumePage;
