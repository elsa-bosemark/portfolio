import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="px-6 md:px-16 lg:px-24 py-24 md:py-32 border-t border-border">
      {/* Photo left + title & bio right */}
      <div className="flex flex-col lg:flex-row gap-10 md:gap-14 items-center justify-center mb-20 md:mb-28 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <div>
            <div className="relative w-52 h-64 md:w-60 md:h-72 mb-6">
              <img
                src="profilepicture.PNG"
                alt="Elsa Bosemark"
                className="w-full h-full object-cover"
                style={{
                  borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                }}
              />
              <div
                className="absolute -inset-3 border-2 border-primary/30 pointer-events-none"
                style={{
                  borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  transform: "rotate(6deg)",
                }}
              />
            </div>
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
              Fun Facts
            </p>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide uppercase bg-muted text-muted-foreground rounded-sm w-fit">
                🦐 Raising Pet Shrimp
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide uppercase bg-muted text-muted-foreground rounded-sm w-fit">
                🍋 Loves Preserved Lemons
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide uppercase bg-muted text-muted-foreground rounded-sm w-fit">
                🏉 Played Stanford Rugby
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl leading-tight text-foreground mb-8">
            Designer, thinker, <span className="italic text-primary">maker</span>.
          </h2>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed max-w-xl">
            <p>
              Born and raised in San Francisco, I grew up tinkering with digital
              tools long before I knew "design" was a discipline. That curiosity
              brought me to Stanford, where I'm studying Product Design and
              Computer Science, learning to build things and to ask why they
              should exist in the first place.
            </p>
            <p>
              On campus I mentor for Stanford GSE's AI Tinkery, advise peers at
              the d.school, and research new fabrication methods at ShapeLab.
              Each role sharpens a different lens (education, creativity,
              technology) and I like bringing all three to the products I work on.
            </p>
            <p>
              My goal is to be the kind of strategic thinker who helps teams
              move from ambiguity to conviction, building products that are
              grounded in real human needs and crafted with care.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Details row */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pt-12 border-t border-border space-y-10"
      >
        {/* Education + Get in Touch row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              Education
            </p>
            <div className="flex flex-col md:flex-row md:gap-10 gap-4">
              <div>
                <p className="text-foreground text-base font-medium">
                  Stanford University
                </p>
                <p className="text-muted-foreground text-base">
                  M.S. in Computer Science, HCI
                </p>
                <p className="text-xs text-muted-foreground mt-1">2027</p>
              </div>
              <div>
                <p className="text-foreground text-base font-medium">
                  Stanford University
                </p>
                <p className="text-muted-foreground text-base">
                  B.S. in Design
                </p>
                <p className="text-xs text-muted-foreground mt-1">2027</p>
              </div>
            </div>
          </div>

          <div id="contact">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              Get in Touch
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-6">
                <a
                  href="https://www.linkedin.com/in/elsa-bosemark/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://drive.google.com/drive/folders/1ItQnTRbk4xs_J7Z4OXYOoW3-VKtaUJl0?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
            Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Figma",
              "Adobe Creative Suite",
              "Flora AI",
              "Procreate",
              "Rhino 3D",
              "Web & Mobile UI",
              "Accessibility",
              "User Interviews",
              "Journey Mapping",
              "User Flows",
              "Usability Testing",
              "A/B Testing",
              "JavaScript",
              "React Native",
              "Python",
              "C++",
              "HTML/CSS",
              "WordPress",
              "Tableau",
              "D3",
              "R",
              "Slack",
              "Google Workspace",
              "Presentation Delivery",
              "Pitching",
              "Grant Writing",
              "ChatGPT",
              "Cursor AI",
              "Airtable AI",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-medium tracking-wide uppercase bg-muted text-muted-foreground rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
