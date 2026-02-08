import { motion } from "framer-motion";

interface CaseStudyCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  index: number;
}

const CaseStudyCard = ({ title, category, description, image, index }: CaseStudyCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-sm mb-6">
        <img
          src={image}
          alt={title}
          className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
        {category}
      </p>
      <h3 className="text-2xl md:text-3xl leading-tight text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-base leading-relaxed max-w-md">
        {description}
      </p>
    </motion.article>
  );
};

export default CaseStudyCard;
