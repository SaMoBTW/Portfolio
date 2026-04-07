import { motion } from "motion/react";
import { Download, GraduationCap, Briefcase, Check } from "lucide-react";

export function Experience() {
  const timeline = [
    {
      date: "Feb 2026 - Present",
      type: "education",
      title: "Technology Accessibility Assistant & M.S. Computer Science",
      organization: "Bowie State University",
      description:
        "Managing Blackboard Learn, developing analytical reports, and pursuing advanced CS studies.",
      tech: ["Blackboard Learn", "Data Analytics", "Learning Management Systems", "Accessibility"],
    },
    {
      date: "Jan 2025 - May 2025",
      type: "work",
      title: "System Development Intern",
      organization: "Federated Insurance",
      description:
        "Developed high-availability backend features for a claims portal using Java. Automated AWS Lambda data validation.",
      tech: ["Java", "AWS Lambda", "Backend Development", "High-Availability Systems"],
    },
    {
      date: "Jun 2024 - Aug 2024",
      type: "work",
      title: "Software Engineering Intern",
      organization: "Optum",
      description:
        "Engineered a scalable Java/SpringBoot microservice reducing latency by 20%. Deployed Docker containers on AWS EC2.",
      tech: ["Java", "SpringBoot", "Docker", "AWS EC2", "Microservices"],
    },
    {
      date: "Aug 2023 - May 2025",
      type: "education",
      title: "B.S. Computer Information Systems",
      organization: "Bemidji State University",
      description:
        "Built core fundamentals in software engineering and systems architecture.",
      tech: ["Software Engineering", "Data Structures", "Systems Architecture", "Algorithms"],
    },
    {
      date: "Aug 2019 - Jan 2022",
      type: "education",
      title: "B.S. Business Informatics",
      organization: "University of Technology Bahrain",
      description:
        "Studied the intersection of business and technology, focusing on information systems and business processes.",
      tech: ["Business Information Systems", "Enterprise Systems", "Database Management"],
    },
  ];

  const skills = [
    {
      category: "Languages",
      items: ["Java", "Python", "JavaScript", "C++", "SQL", "PHP"],
    },
    {
      category: "Frameworks/Web",
      items: ["React", "Next.js", "Node.js", "Tailwind CSS", "Bootstrap"],
    },
    {
      category: "Tools/Infra",
      items: ["AWS", "Docker", "Git", "PostgreSQL", "Linux", "Jenkins"],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-border/50 rounded-lg overflow-hidden bg-background/80 backdrop-blur-xl"
            style={{
              boxShadow:
                "0 0 40px rgba(167, 139, 250, 0.2), 0 20px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Terminal Header */}
            <div className="border-b border-border/50 bg-accent/30 px-4 py-3 flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-muted-foreground font-mono">
                  ~/experience
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                <span className="text-primary/60 font-mono text-base md:text-lg mr-3">
                  &lt;Experience /&gt;
                </span>
                Professional Journey
              </h1>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
                My career has been driven by a passion for building scalable systems and 
                continuous learning. From backend development and microservices architecture 
                to accessibility initiatives and advanced computer science studies, I thrive 
                on solving complex problems and delivering impactful solutions. Below is a 
                comprehensive timeline of my professional and academic experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary/60 font-mono text-sm md:text-base mr-3">
                &lt;Timeline /&gt;
              </span>
              Professional & Academic History
            </h2>
            <div className="flex-1 h-px bg-border ml-4"></div>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Glowing Purple Timeline Line */}
            <div
              className="absolute left-0 md:left-8 top-0 bottom-0 w-[2px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(167, 139, 250, 0.8) 0%, rgba(167, 139, 250, 0.4) 50%, rgba(167, 139, 250, 0.2) 100%)",
                boxShadow: "0 0 20px rgba(167, 139, 250, 0.6), 0 0 40px rgba(167, 139, 250, 0.3)",
              }}
            ></div>

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative pl-12 md:pl-24"
                >
                  {/* Glowing Node */}
                  <div
                    className="absolute left-[-6px] md:left-[26px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
                    style={{
                      boxShadow:
                        "0 0 20px rgba(167, 139, 250, 0.8), 0 0 40px rgba(167, 139, 250, 0.4)",
                    }}
                  ></div>

                  {/* Glassmorphism Card */}
                  <div
                    className="relative rounded-lg border border-primary/30 bg-background/60 backdrop-blur-xl p-6 md:p-8 hover:border-primary/50 hover:bg-background/70 transition-all duration-300 group"
                    style={{
                      boxShadow:
                        "inset 0 0 30px rgba(167, 139, 250, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    {/* Icon Badge */}
                    <div className="absolute -left-3 md:-left-6 top-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/40 flex items-center justify-center">
                      {item.type === "education" ? (
                        <GraduationCap size={18} className="text-primary md:w-5 md:h-5" />
                      ) : (
                        <Briefcase size={18} className="text-primary md:w-5 md:h-5" />
                      )}
                    </div>

                    {/* Date Tag */}
                    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/30">
                      <span className="text-primary font-mono text-xs md:text-sm">
                        {item.date}
                      </span>
                    </div>

                    {/* Title & Organization */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-base md:text-lg mb-4 font-medium">
                      {item.organization}
                    </p>

                    {/* Description */}
                    <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                      {item.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 rounded bg-primary/5 border border-primary/20 text-primary font-mono text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume CTA at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative mt-20 pl-12 md:pl-24"
            >
              {/* Final Glowing Node */}
              <div
                className="absolute left-[-6px] md:left-[26px] top-8 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
                style={{
                  boxShadow:
                    "0 0 20px rgba(167, 139, 250, 0.8), 0 0 40px rgba(167, 139, 250, 0.4)",
                }}
              ></div>

              {/* Magnetic Glowing Button */}
              <div className="flex justify-center md:justify-start">
                <a
                  href="/resume.pdf"
                  download
                  className="group relative inline-flex items-center gap-3 px-8 py-5 rounded-lg bg-primary text-white font-mono text-sm md:text-base font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    boxShadow:
                      "0 0 40px rgba(167, 139, 250, 0.6), 0 8px 32px rgba(167, 139, 250, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Animated Glow Effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      transform: "translateX(-100%)",
                      animation: "shine 2s infinite",
                    }}
                  ></div>

                  <Download size={20} className="relative z-10" />
                  <span className="relative z-10">Download Full Resume (PDF)</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills & Technologies Section */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary/60 font-mono text-sm md:text-base mr-3">
                &lt;Skills /&gt;
              </span>
              Skills & Technologies
            </h2>
            <div className="flex-1 h-px bg-border ml-4"></div>
          </div>

          {/* 3-Column Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative rounded-lg border border-primary/30 bg-background/60 backdrop-blur-xl p-6 hover:border-primary/50 hover:bg-background/70 transition-all duration-300"
                style={{
                  boxShadow:
                    "inset 0 0 30px rgba(167, 139, 250, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Category Title */}
                <h3 className="text-lg md:text-xl font-bold text-primary mb-6 font-mono">
                  {skillGroup.category}
                </h3>

                {/* Skills List */}
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05, duration: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      <Check size={14} className="text-primary flex-shrink-0" />
                      <span className="text-slate-300 text-sm md:text-base">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add shine animation */}
      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}