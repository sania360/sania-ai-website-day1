import { motion } from "framer-motion";
import { HiDownload } from "react-icons/hi";
import { bio, profile } from "@/data/siteData";
import Timeline from "@/components/about/Timeline";
import SkillsBars from "@/components/about/SkillsBars";
import Certificates from "@/components/about/Certificates";
import { useSEO } from "@/hooks/useSEO";

export default function About() {
  useSEO({ title: "About", description: "Learn about Sania Ismail's background in bioinformatics, machine learning, and AI engineering." });
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-teal font-semibold uppercase text-sm tracking-wide">About</p>
        <h1 className="font-display text-4xl font-bold text-navy dark:text-mist mt-1">My Story</h1>
        <p className="mt-5 text-navy/80 dark:text-mist/80 leading-relaxed max-w-3xl">{bio.story}</p>

        <a
          href={profile.resumeUrl}
          download
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-semibold text-white hover:bg-teal-light transition-colors"
        >
          <HiDownload /> Download Resume
        </a>
      </motion.div>

      <div className="mt-14 grid sm:grid-cols-2 gap-8">
        <div className="rounded-2xl glass p-6">
          <h2 className="font-display text-xl font-bold text-navy dark:text-mist">Mission</h2>
          <p className="mt-2 text-sm text-navy/70 dark:text-mist/70">{bio.mission}</p>
        </div>
        <div className="rounded-2xl glass p-6">
          <h2 className="font-display text-xl font-bold text-navy dark:text-mist">Vision</h2>
          <p className="mt-2 text-sm text-navy/70 dark:text-mist/70">{bio.vision}</p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-navy dark:text-mist">Education & Experience</h2>
        <Timeline />
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-navy dark:text-mist">Skills</h2>
        <SkillsBars />
      </section>

      <section className="mt-16 mb-8">
        <h2 className="font-display text-2xl font-bold text-navy dark:text-mist">Certifications</h2>
        <Certificates />
      </section>
    </div>
  );
}
