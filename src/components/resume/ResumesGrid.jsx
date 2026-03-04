import ResumeCard from "@/components/resume/ResumeCard";

const ResumesGrid = ({ resumes }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {resumes.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} />
      ))}
    </div>
  );
};

export default ResumesGrid;
