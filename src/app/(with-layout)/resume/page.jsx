import EmptyState from "@/components/shared/EmptyState";
import PageIntro from "@/components/shared/PageIntro";
import ResumesGrid from "@/components/resume/ResumesGrid";
import { getActiveResumes } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const ResumePage = async () => {
  const resumes = await getActiveResumes();

  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <PageIntro
        title="Resume"
        description="View online or download my resume directly from Google Drive."
      />

      {!resumes.length ? (
        <EmptyState
          message="No active resumes available right now."
          className="p-8"
          centered
        />
      ) : (
        <ResumesGrid resumes={resumes} />
      )}
    </section>
  );
};

export default ResumePage;
