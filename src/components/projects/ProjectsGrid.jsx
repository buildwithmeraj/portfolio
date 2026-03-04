import ProjectCard from "@/components/projects/ProjectCard";

const ProjectsGrid = ({ projects, maxSkills }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} maxSkills={maxSkills} />
      ))}
    </div>
  );
};

export default ProjectsGrid;
