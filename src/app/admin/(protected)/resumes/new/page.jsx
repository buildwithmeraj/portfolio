import ResumeForm from "@/components/admin/ResumeForm";

const CreateResumePage = () => {
  return (
    <section className="mx-auto max-w-xl space-y-2">
      <h1 className="text-2xl font-semibold">Create Resume</h1>
      <ResumeForm mode="create" />
    </section>
  );
};

export default CreateResumePage;
