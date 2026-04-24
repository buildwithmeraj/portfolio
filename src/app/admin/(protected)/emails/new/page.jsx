import EmailForm from "@/components/admin/EmailForm";

const CreateEmailPage = () => {
  return (
    <section className="mx-auto max-w-xl space-y-2">
      <h2 className="text-2xl font-semibold">Create Email Account</h2>
      <EmailForm mode="create" />
    </section>
  );
};

export default CreateEmailPage;
