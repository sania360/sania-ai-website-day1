import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft, HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projectsData";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-navy dark:text-mist">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block text-teal font-semibold hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const sections: Array<[string, string]> = [
    ["Problem", project.problem],
    ["Solution", project.solution],
    ["Architecture", project.architecture],
    ["Challenges", project.challenges],
    ["Results", project.results],
    ["Future Improvements", project.futureImprovements],
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/projects" className="inline-flex items-center gap-2 text-teal font-semibold hover:underline">
        <HiArrowLeft /> Back to Projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
        <span className="inline-block rounded-full bg-teal/10 text-teal text-xs font-semibold px-3 py-1">
          {project.category}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy dark:text-mist mt-3">{project.title}</h1>
        <p className="mt-2 text-sm text-navy/60 dark:text-mist/60">Timeline: {project.timeline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span key={t} className="rounded-full glass px-3 py-1 text-xs font-medium text-navy/70 dark:text-mist/70">
              {t}
            </span>
          ))}
        </div>

        {/* Screenshot / video placeholders */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="aspect-video rounded-2xl glass grid place-items-center text-navy/40 dark:text-mist/40 text-sm">
            Screenshot placeholder
          </div>
          <div className="aspect-video rounded-2xl glass grid place-items-center text-navy/40 dark:text-mist/40 text-sm">
            Demo video placeholder
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-navy dark:text-mist hover:text-teal"
          >
            <FaGithub /> GitHub
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-light"
            >
              <HiExternalLink /> Live Demo
            </a>
          )}
        </div>

        <div className="mt-12 space-y-8">
          {sections.map(([heading, body]) => (
            <div key={heading}>
              <h2 className="font-display text-xl font-bold text-navy dark:text-mist">{heading}</h2>
              <p className="mt-2 text-navy/70 dark:text-mist/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
