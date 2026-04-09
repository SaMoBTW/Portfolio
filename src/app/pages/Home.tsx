import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";
import profileImg from "../../assets/d7db82655c6674b4948dd2ab7cad4334dee31f29.png";
import { useAsync } from "../hooks";
import { supabase } from "../lib/supabase";
import { TerminalVisual } from "../components/TerminalVisual";
import { ContactForm } from "../components/ContactForm";

export function Home() {
  const { data: settingsData } = useAsync(async () => {
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  });

  const { data: featuredProjects } = useAsync(async () => {
    const { data, error } = await supabase.from('projects').select('*').eq('featured_on_homepage', true).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  });
  
  const settings = settingsData || {
    name: "Samir Mahmoud.",
    tagline: "I build things for the web.",
    bio: "I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.",
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden py-12 -mt-20">
        {/* Purple Glow Background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.4) 0%, rgba(192, 132, 252, 0.2) 25%, rgba(192, 132, 252, 0.05) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        ></div>
        
        {/* NEW: Top-Left Purple Blob */}
        <div
          className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 1) 0%, rgba(167, 139, 250, 0.5) 30%, transparent 70%)',
            filter: 'blur(120px)',
            transform: 'translate(-30%, -30%)',
          }}
        ></div>

        {/* NEW: Bottom-Right Purple Blob */}
        <div
          className="absolute bottom-0 right-0 w-[900px] h-[900px] pointer-events-none opacity-10"
          style={{            
            background: 'radial-gradient(circle, rgba(192, 132, 252, 1) 0%, rgba(192, 132, 252, 0.6) 30%, transparent 70%)',
            filter: 'blur(120px)',
            transform: 'translate(30%, 30%)',
          }}
        ></div>
        
        <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full relative z-10">
          {/* Terminal/Browser Window Frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border border-border/50 rounded-[14px] overflow-hidden bg-background/80 backdrop-blur-[20px] shadow-2xl"
            style={{
              boxShadow: '0 0 60px rgba(167, 139, 250, 0.3), 0 20px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Window Header with Traffic Lights */}
            <div className="border-b border-border/50 bg-accent/30 px-4 py-3 flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors cursor-pointer"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-muted-foreground font-mono">~/portfolio</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16">
              {/* Introduction */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-mono text-primary mb-6 text-sm md:text-base lg:text-lg"
              >
                Hi, my name is
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
                style={{
                  color: "#e2e8f0",
                  lineHeight: "1.1",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {settings.name}
              </motion.h1>

              {/* Tagline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.1",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {settings.tagline}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl mb-12 leading-relaxed"
              >
                {settings.bio}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-7 py-4 border border-primary text-primary rounded hover:bg-primary/10 transition-all duration-300 font-mono text-sm"
                >
                  Check out my work!
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-32 relative">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Section Header - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <h2 className="text-3xl font-bold">
              <span className="text-primary/60 font-mono text-base mr-3">&lt;AboutMe /&gt;</span>
              About Me
            </h2>
            <div className="flex-1 h-px bg-border ml-4"></div>
          </motion.div>

          {/* 2-Column Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col-reverse md:flex-row justify-between items-start gap-12"
          >
            {/* Left Column - Text Content + Tech Stack (60%) - Shows second on mobile */}
            <div className="w-full md:w-[60%]">
              {/* Text Paragraphs */}
              <div className="space-y-5 text-slate-300 mb-8" style={{ lineHeight: '1.6' }}>
                <p>
                  Hello! I'm a passionate developer and designer with a love for
                  creating digital experiences that make a difference. My journey
                  in tech started with curiosity and has evolved into a career
                  building solutions that people genuinely enjoy using.
                </p>
                <p>
                  I specialize in crafting responsive, accessible web applications
                  with a focus on performance and user experience. Whether it's
                  front-end development, back-end architecture, or UI/UX design,
                  I bring a holistic approach to every project.
                </p>
              </div>

              {/* Tech Stack Card - Glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative rounded-lg overflow-hidden border border-primary/30 bg-background/40 backdrop-blur-xl p-8 mb-8"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(167, 139, 250, 0.1), 0 0 20px rgba(167, 139, 250, 0.15)',
                }}
              >
                <p className="text-muted-foreground mb-4">Here are a few technologies I've been working with recently:</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "React & Next.js",
                    "TypeScript",
                    "Node.js",
                    "Tailwind CSS",
                    "PostgreSQL",
                    "AWS",
                  ].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={14} className="text-primary" />
                      <span className="font-mono text-sm">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm"
                >
                  Learn more about me
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            {/* Right Column - Profile Picture Card (35%) - Shows first on mobile */}
            <div className="w-full md:w-[35%] flex justify-center md:justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group w-full md:max-w-[240px]"
              >
                <div 
                  className="relative rounded-lg overflow-hidden border border-primary/30 bg-background/40 backdrop-blur-xl p-3"
                  style={{
                    boxShadow: 'inset 0 0 40px rgba(167, 139, 250, 0.15), 0 0 30px rgba(167, 139, 250, 0.2)',
                  }}
                >
                  <div className="relative w-full rounded overflow-hidden border border-primary/50 bg-primary/10" style={{ aspectRatio: '3/4' }}>
                    <img
                      src={profileImg}
                      alt="Samir Mahmoud"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    {/* Purple overlay */}
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 relative">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-16">
            <h2 className="text-3xl font-bold">
              <span className="text-primary/60 font-mono text-base mr-3">&lt;Projects /&gt;</span>
              Some Things I've Built
            </h2>
            <div className="flex-1 h-px bg-border ml-4"></div>
          </div>

          <div className="space-y-12">
            {featuredProjects?.map((project: any, index: number) => {
              if (project.title?.trim().toLowerCase() === 'home media server') {
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative group"
                  >
                    {/* Desktop Layout */}
                    <div className="hidden md:block relative rounded-lg overflow-hidden border border-primary/20 bg-background/40 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                      <div className={`relative h-[400px] w-full p-8 flex items-center gap-8 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                        {/* Terminal Dashboard - Floating Window typically on Left */}
                        <div className="w-[55%] h-full flex items-start">
                          <TerminalVisual />
                        </div>
      
                        {/* Project Description */}
                        <div className="w-[45%] flex flex-col justify-start pr-4">
                          <p className="text-primary font-mono text-sm mb-3">Featured Project</p>
                          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">{project.title}</h3>
                          <p className="text-slate-300 leading-relaxed mb-6">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-3 font-mono text-sm text-gray-400">
                            {project.technologies?.map((tech: string) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
      
                    {/* Mobile Layout */}
                    <div className="md:hidden rounded-lg overflow-hidden border border-primary/20 bg-background/40 backdrop-blur-sm">
                      <div className="w-full p-4 bg-[#0a0a1a]">
                        <TerminalVisual />
                      </div>
                      <div className="p-6 bg-[#0a0a1a] border-t border-primary/10">
                        <p className="text-primary font-mono text-xs mb-2">Featured Project</p>
                        <h3 className="text-2xl font-bold text-white mb-3 font-mono">{project.title}</h3>
                        <p className="text-slate-300 leading-relaxed mb-4 text-sm">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 font-mono text-xs text-gray-400">
                          {project.technologies?.map((tech: string) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                {/* Desktop Layout */}
                <div className="hidden md:block relative rounded-lg overflow-hidden border border-primary/20 bg-background/40 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                  <div className={`relative h-[400px] w-full flex items-stretch ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                    {/* Content Box */}
                    <div className="w-[40%] relative z-10 p-8 md:p-10 flex flex-col justify-center">
                      <div 
                        className="rounded-lg border border-primary/30 bg-background/80 backdrop-blur-xl p-6"
                        style={{
                          boxShadow: 'inset 0 0 40px rgba(167, 139, 250, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <p className="text-primary font-mono text-sm mb-3">Featured Project</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h3>
                        <p className="text-gray-200 leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-3 font-mono text-sm text-gray-300">
                          {project.technologies?.map((tech: string) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Background Image */}
                    <div className={`w-[70%] absolute ${index % 2 !== 0 ? 'left-0' : 'right-0'} top-0 h-full overflow-hidden`}>
                      <img
                        src={project.image_url || "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80"}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden rounded-lg overflow-hidden border border-primary/20 bg-background/40 backdrop-blur-sm">
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={project.image_url || "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 bg-[#0a0a1a]">
                    <p className="text-primary font-mono text-xs mb-2">Featured Project</p>
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-slate-300 leading-relaxed mb-4 text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 font-mono text-xs text-gray-400">
                      {project.technologies?.map((tech: string) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-10 py-5 bg-transparent text-primary font-bold rounded border border-primary transition-all duration-300 font-mono text-base hover:bg-primary/5"
            >
              View All Projects
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 relative">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-primary font-mono text-base">What's Next?</span>
            <h2 className="text-5xl font-bold">Get In Touch</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I'll try my best to get back to you!
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-8"
            >
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}