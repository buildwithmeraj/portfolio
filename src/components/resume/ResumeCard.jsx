import { FiDownload, FiExternalLink } from "react-icons/fi";
import { SiReaddotcv } from "react-icons/si";
import { buildGoogleDriveLinks } from "@/lib/google-drive";

const ResumeCard = ({ resume }) => {
  const links = buildGoogleDriveLinks(resume.driveUrl);

  return (
    <article className="reveal relative rounded-2xl border border-base-300/90 bg-base-100/80 p-5 shadow-sm backdrop-blur">
      <h2 className="text-xl font-semibold">{resume.title}</h2>
      <p className="mt-1 text-xs opacity-70">View or Download Resume</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          className="btn btn-sm btn-primary"
          href={links.viewUrl}
          target="_blank"
          rel="noreferrer"
        >
          <FiExternalLink className="size-4" />
          View
        </a>
        <a
          className="btn btn-sm btn-outline"
          href={links.downloadUrl}
          target="_blank"
          rel="noreferrer"
        >
          <FiDownload className="size-4" />
          Download
        </a>
      </div>
      <SiReaddotcv
        className="absolute bottom-3 right-3 text-base-content/20"
        size={80}
      />
    </article>
  );
};

export default ResumeCard;
