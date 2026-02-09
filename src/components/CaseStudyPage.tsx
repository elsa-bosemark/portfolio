import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CaseStudySection {
  title: string;
  content: string[];
  images?: { src: string; alt: string; caption?: string }[];
}

interface CaseStudyPageProps {
  title: string;
  category: string;
  date: string;
  skills: string[];
  image: string;
  overview: string;
  sections: CaseStudySection[];
}

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const CaseStudyPage = ({
  title,
  category,
  date,
  skills,
  image,
  overview,
  sections,
}: CaseStudyPageProps) => {
  return (
    <main className="min-h-screen bg-background">
      {/* Back link */}
      <div className="px-6 md:px-16 lg:px-24 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
        >
          &larr; Back
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-16 lg:px-24 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <p className="text-xs font-medium tracking-widest uppercase text-primary">
              {category}
            </p>
            <span className="h-px flex-1 bg-border max-w-[120px]" />
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              {date}
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-foreground mb-8 max-w-4xl">
            {title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-12">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-medium tracking-wide uppercase bg-muted text-muted-foreground rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-sm"
        >
          <img
            src={image}
            alt={title}
            className="w-full aspect-[21/9] object-cover"
          />
        </motion.div>
      </section>

      {/* Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
            Overview
          </p>
          <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light">
            {overview}
          </p>
        </motion.div>
      </section>

      {/* Content sections */}
      {sections.map((section, i) => (
        <section
          key={section.title}
          className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${
            i % 2 === 0 ? "bg-card" : ""
          }`}
        >
          <motion.div {...fadeIn} className="max-w-3xl mx-auto">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
              {section.title}
            </p>
            <div className="space-y-5">
              {section.content.map((paragraph, j) => (
                <p
                  key={j}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {section.images && section.images.length > 0 && (
              <div className={`mt-10 ${section.images.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}`}>
                {section.images.map((img, j) => (
                  <figure key={j}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full rounded-sm"
                      loading="lazy"
                    />
                    {img.caption && (
                      <figcaption className="text-base text-muted-foreground mt-2">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      ))}

      {/* Next project / back */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 border-t border-border">
        <div className="flex justify-center">
          <Link
            to="/#work"
            className="inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-primary hover:text-foreground transition-colors group"
          >
            &larr; All Projects
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyPage;
