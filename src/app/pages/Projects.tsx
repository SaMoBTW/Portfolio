import { motion } from "motion/react";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Link } from "react-router-dom";
import { useAsync } from "../hooks";
import { supabase } from "../lib/supabase";

export function Projects() {
  const { data: projectsData } = useAsync(async () => {
    const { data, error } = await supabase.from('projects').select('*').eq('status', 'Published').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  });

  const featuredProjects = projectsData?.filter((p: any) => p.featured_on_homepage) || [];
  const otherProjects = projectsData?.filter((p: any) => !p.featured_on_homepage) || [];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-primary/60 font-mono text-lg mr-3">&lt;MyProjects /&gt;</span>
                Things I've Built
              </h1>
              <div className="flex-1 h-px bg-border ml-4"></div>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              A collection of projects I've worked on, ranging from web applications
              to open source tools. Each one tells a story of problem-solving and
              innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="space-y-32">
            {featuredProjects.map((project: any, index: number) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative group cursor-pointer"
                >
                  <div
                    className={`grid md:grid-cols-12 gap-4 items-center ${
                      index % 2 === 1 ? "" : ""
                    }`}
                  >
                    {/* Project Image */}
                    <div
                      className={`md:col-span-7 relative group-hover:scale-[1.02] transition-transform duration-500 ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
                    >
                      <div className="relative rounded overflow-hidden bg-primary/5">
                        <img
                          src={project.image_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"}
                          alt={project.title}
                          className="w-full aspect-video object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300"></div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div
                      className={`md:col-span-5 space-y-4 ${
                        index % 2 === 1
                          ? "md:order-1 md:text-left"
                          : "md:text-right"
                      }`}
                    >
                      <p className="text-primary font-mono text-sm">Featured Project</p>
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      <div className="bg-card p-6 rounded shadow-lg border border-border">
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>
                      <div
                        className={`flex flex-wrap gap-3 font-mono text-sm text-muted-foreground ${
                          index % 2 === 1 ? "" : "md:justify-end"
                        }`}
                      >
                        {project.technologies?.map((tag: string) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div
                        className={`flex gap-4 ${
                          index % 2 === 1 ? "" : "md:justify-end"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            className="text-foreground hover:text-primary transition-colors"
                            aria-label="GitHub"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.project_url && (
                          <a
                            href={project.project_url}
                            className="text-foreground hover:text-primary transition-colors"
                            aria-label="External Link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-4">
              Other Noteworthy Projects
            </h2>
            <p className="text-center text-muted-foreground">
              view the archive
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project: any, index: number) => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="group bg-card border border-border rounded p-8 hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg flex flex-col h-full cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-8">
                    <Folder className="text-primary" size={40} />
                    <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="GitHub"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="External Link"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 font-mono text-xs text-muted-foreground">
                  {project.technologies?.map((tag: string) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}