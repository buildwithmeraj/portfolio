import EmptyState from "@/components/shared/EmptyState";
import PageIntro from "@/components/shared/PageIntro";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import { getProjects } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <PageIntro title="All Projects" description="Complete portfolio of my work." />

      {!projects.length ? <EmptyState message="No projects found." /> : <ProjectsGrid projects={projects} />}
    </section>
  );
};

export default ProjectsPage;
