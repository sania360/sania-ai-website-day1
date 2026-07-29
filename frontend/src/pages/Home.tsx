import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedServices from "@/components/home/FeaturedServices";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechMarquee from "@/components/home/TechMarquee";
import TestimonialsPreview from "@/components/home/TestimonialsPreview";
import BlogPreview from "@/components/home/BlogPreview";
import Newsletter from "@/components/home/Newsletter";
import { useSEO } from "@/hooks/useSEO";

export default function Home() {
  useSEO({
    title: "Home",
    description: "AI Engineer, Machine Learning Developer, Data Analyst, and Bioinformatics Engineer based in Faisalabad, Pakistan.",
  });
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedServices />
      <FeaturedProjects />
      <TechMarquee />
      <TestimonialsPreview />
      <BlogPreview />
      <Newsletter />
    </>
  );
}
