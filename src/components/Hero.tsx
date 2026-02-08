import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-[85vh] flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl"
      >
        <p className="text-sm md:text-base font-medium tracking-widest uppercase text-muted-foreground mb-6">
          Portfolio
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-foreground mb-8">
          Alex <span className="italic text-primary">Morgan</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light">
          A multidisciplinary designer crafting{" "}
          <span className="text-foreground font-medium">human-centered experiences</span>{" "}
          through research, strategy, and bold visual storytelling.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 flex items-center gap-8"
      >
        <a
          href="#work"
          className="text-sm font-medium tracking-widest uppercase text-primary hover:text-foreground transition-colors"
        >
          View Work ↓
        </a>
        <span className="h-px w-24 bg-border" />
      </motion.div>
    </section>
  );
};

export default Hero;
