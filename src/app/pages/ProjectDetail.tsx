import { useParams, Link } from "react-router-dom";
import { useAsync } from "../hooks";
import { supabase } from "../lib/supabase";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, MonitorPlay, Calendar, Tag, Layers } from "lucide-react";

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project, loading, error } = useAsync(async () => {
    if (!projectId) return null;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();
    if (error) throw error;
    return data;
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">The project you are looking for doesn't exist or has been removed.</p>
        <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono rounded-lg hover:bg-primary/90 transition-colors">
          <ArrowLeft size={18} /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative w-full rounded-2xl overflow-hidden border border-border bg-background/50 backdrop-blur-sm mb-12 shadow-2xl"
          style={{ aspectRatio: "21/9" }}
        >
          <img 
            src={project.image_url || "https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 pb-6">
            <div className="flex flex-wrap gap-3 font-mono text-xs text-primary mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                {project.category}
              </span>
              {project.status === "Published" && (
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 backdrop-blur-md">
                  Active
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              {project.title}
            </h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left, 2/3) */}
          <div className="lg:col-span-2 space-y-12">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-invert prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none text-lg leading-relaxed"
            >
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-border/50 pb-4">Overview</h2>
              {project.long_description ? (
                <div className="space-y-4">
                  {project.long_description.split("\n").map((paragraph: string, idx: number) => (
                    paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
                  ))}
                </div>
              ) : (
                <p>{project.description}</p>
              )}
            </motion.section>

            {/* Video Player (If Exists) */}
            {project.demo_video_url && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6 border-b border-border/50 pb-4">
                  <MonitorPlay className="text-primary" /> Video Demo
                </h2>
                <div className="rounded-xl overflow-hidden border border-border shadow-2xl relative w-full" style={{ aspectRatio: '16/9' }}>
                  <iframe 
                    src={project.demo_video_url} 
                    title="Project Demo"
                    className="absolute top-0 left-0 w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              </motion.section>
            )}

            {/* Gallery (If Exists) */}
            {project.gallery_images && project.gallery_images.length > 0 && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-border/50 pb-4">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery_images.map((img: string, idx: number) => (
                    <div key={idx} className="rounded-lg overflow-hidden border border-border shadow-lg">
                      <img src={img} alt={`Gallery ${idx+1}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar (Right, 1/3) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Quick Links Card */}
            <div className="bg-accent/40 backdrop-blur-xl border border-border p-6 rounded-xl shadow-xl">
              <h3 className="text-lg font-mono font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                {project.project_url ? (
                  <a href={project.project_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-mono rounded-lg hover:bg-primary/90 transition-all font-semibold">
                    <ExternalLink size={18} /> Visit Live Site
                  </a>
                ) : (
                  <button disabled className="flex items-center justify-center gap-2 w-full py-3 bg-muted text-muted-foreground font-mono rounded-lg opacity-50 cursor-not-allowed">
                    <ExternalLink size={18} /> Offline
                  </button>
                )}

                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 border border-border text-foreground font-mono rounded-lg hover:bg-accent transition-all font-semibold">
                    <Github size={18} /> View Source
                  </a>
                )}
              </div>
            </div>

            {/* Meta Data Card */}
            <div className="bg-background/40 backdrop-blur-xl border border-border p-6 rounded-xl shadow-xl">
              <h3 className="text-lg font-mono font-bold text-white mb-4">Project Details</h3>
              <ul className="space-y-4">
                {project.completion_date && (
                  <li className="flex items-start gap-4">
                    <Calendar className="text-primary mt-1" size={18} />
                    <div>
                      <p className="text-sm text-muted-foreground font-mono">Completion</p>
                      <p className="text-foreground">{new Date(project.completion_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long'})}</p>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-4">
                  <Tag className="text-primary mt-1" size={18} />
                  <div>
                    <p className="text-sm text-muted-foreground font-mono">Category</p>
                    <p className="text-foreground">{project.category}</p>
                  </div>
                </li>
                {project.technologies && project.technologies.length > 0 && (
                  <li className="flex items-start gap-4">
                    <Layers className="text-primary mt-1" size={18} />
                    <div>
                      <p className="text-sm text-muted-foreground font-mono mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string) => (
                          <span key={tech} className="px-2 py-1 text-xs rounded bg-accent text-accent-foreground border border-border">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
