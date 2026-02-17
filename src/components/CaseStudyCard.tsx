import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CaseStudyCardProps {
  title: string;
  titleHighlight?: string;
  category: string;
  description: string;
  image: string;
  slug: string;
  skills: string[];
  date: string;
  impact: string;
  index: number;
  comingSoon?: boolean;
}

const CaseStudyCard = ({
  title,
  titleHighlight,
  category,
  description,
  image,
  slug,
  skills,
  date,
  impact,
  index,
  comingSoon,
}: CaseStudyCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-screen flex items-center border-t border-border"
    >
      <div
        className={`w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 px-6 md:px-16 lg:px-24 py-16 md:py-24 ${
          isEven ? "" : "lg:direction-rtl"
        }`}
      >
        {/* Image */}
        {comingSoon ? (
          <div className={`relative flex items-center justify-center rounded-sm ${isEven ? "" : "lg:order-2"}`}>
            <img
              src={image}
              alt={title}
              className="w-full max-h-[60vh] object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <Link to={slug} className={`flex items-center justify-center rounded-sm ${isEven ? "" : "lg:order-2"}`}>
            <img
              src={image}
              alt={title}
              className="w-full max-h-[60vh] object-contain transition-transform duration-700 ease-out hover:scale-105"
              loading="lazy"
            />
          </Link>
        )}

        {/* Content */}
        <div className={`flex flex-col justify-center ${isEven ? "" : "lg:order-1"}`}>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-xs font-medium tracking-widest uppercase text-primary">
              {category}
            </p>
            <span className="h-px flex-1 bg-border" />
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              {date}
            </p>
          </div>

          <h3 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground mb-6">
            {titleHighlight
              ? <>
                  {title.split(titleHighlight)[0]}
                  <span className="text-primary">{titleHighlight}</span>
                  {title.split(titleHighlight)[1]}
                </>
              : title}
          </h3>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
            {description}
          </p>

          {/* Impact card */}
          <div className="bg-card rounded-sm p-6 mb-8 border border-border">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
              Impact
            </p>
            <p className="text-foreground text-base font-medium leading-relaxed">
              {impact}
            </p>
          </div>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-medium tracking-wide uppercase bg-muted text-muted-foreground rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Read more / Coming soon */}
          {comingSoon ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
              Coming Soon
            </span>
          ) : (
            <Link
              to={slug}
              className="inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-primary hover:text-foreground transition-colors group"
            >
              Read More
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default CaseStudyCard;
