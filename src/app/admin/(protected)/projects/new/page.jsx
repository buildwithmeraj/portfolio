import ProjectForm from "@/components/admin/ProjectForm";

const CreateProjectPage = () => {
  return (
    <section className="mx-auto max-w-2xl space-y-2">
      <div>
        <h1 className="text-2xl font-semibold">Create Project</h1>
        <p className="text-sm opacity-80 my-1">
          Add project details and map related skills from your skills database.
        </p>
      </div>
      <ProjectForm mode="create" />
    </section>
  );
};

export default CreateProjectPage;
