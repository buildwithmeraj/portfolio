import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import EmailForm from "@/components/admin/EmailForm";

async function getEmailAccount(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDb();
  const item = await db
    .collection("emailAccounts")
    .findOne({ _id: new ObjectId(id) });
  if (!item) {
    return null;
  }

  return {
    ...item,
    _id: item._id.toString(),
  };
}

const EditEmailPage = async ({ params }) => {
  const resolvedParams = await params;
  const item = await getEmailAccount(resolvedParams?.id);
  if (!item) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-xl space-y-2">
      <h1 className="text-2xl font-semibold">Edit Email Account</h1>
      <EmailForm mode="edit" emailId={item._id} initialData={item} />
    </section>
  );
};

export default EditEmailPage;
