import Image from "next/image";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

const ProjectCard = ({ project, maxSkills }) => {
  const skills = Array.isArray(project.skillMeta) ? project.skillMeta : [];
  const visibleSkills =
    typeof maxSkills === "number" ? skills.slice(0, maxSkills) : skills;

  return (
    <article className="reveal group flex h-full flex-col rounded-2xl border border-base-300/90 bg-base-100/80 p-4 shadow-sm backdrop-blur">
      <div className="overflow-hidden rounded-2xl border border-base-300">
        <Image
          src={project.thumbnailUrl}
          alt={`${project.title} thumbnail`}
          width={400}
          height={300}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="mb-2 mt-6 text-2xl font-semibold tracking-tight text-base-content">
        {project.title}
      </h3>
      <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-base-content/75">
        {project.summary}
      </p>

      {!!visibleSkills.length ? (
        <div className="mt-auto flex flex-wrap gap-1 pt-3">
          {visibleSkills.map((skill) => (
            <span
              key={skill._id}
              className="badge badge-primary badge-soft badge-sm"
            >
              {skill.name}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-auto pt-3" />
      )}

      <div className="mt-4 flex gap-2">
        {project.liveUrl ? (
          <a
            className="btn btn-primary flex-1"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            <FiArrowUpRight className="size-5" />
            Live
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            className="btn btn-outline flex-1"
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub className="size-4" />
            Code
          </a>
        ) : null}
      </div>
    </article>
  );
};

export default ProjectCard;
