import { motion } from "motion/react";
import Masonry from "react-responsive-masonry";
import { FileCode } from "lucide-react";
import profileImg from "../../assets/d7db82655c6674b4948dd2ab7cad4334dee31f29.png";
import { useAsync } from "../hooks";
import { supabase } from "../lib/supabase";

export function About() {
  const { data: workspaceImagesData } = useAsync(async () => {
    const { data, error } = await supabase.from('workspace_images').select('*').order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  });
  const workspaceImages = workspaceImagesData || [];

  const { data: albumsData } = useAsync(async () => {
    const { data, error } = await supabase.from('albums').select('*').order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  });
  const albums = albumsData || [];

  // Tech creator avatars
  const creators = [
    { name: "Linus Tech Tips" },
    { name: "Fireship" },
    { name: "ThePrimeagen" },
    { name: "Theo" },
    { name: "NetworkChuck" },
    { name: "Jeff Geerling" },
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
            {/* VS Code Tab Bar Header */}
            <div className="border-b border-border/50 bg-[#1e1e1e] flex items-center">
              {/* Active Tab */}
              <div className="flex items-center gap-2 px-4 py-2 bg-background/80 border-r border-border/50 min-w-[160px]">
                <FileCode className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground font-mono">about.tsx</span>
              </div>
              {/* Empty Tab Bar Space */}
              <div className="flex-1"></div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                {/* Text Content - First in DOM, Left Column on Desktop */}
                <div className="w-full md:w-[60%]">
                  <div className="flex gap-4">
                    {/* Line Numbers */}
                    <div className="hidden md:flex flex-col items-end pt-2 pr-4 border-r border-slate-700/30 select-none">
                      <span className="text-slate-600 font-mono text-xs leading-relaxed mb-[1.15rem]">1</span>
                      <span className="text-slate-600 font-mono text-xs leading-relaxed mb-[1.15rem]">2</span>
                      <span className="text-slate-600 font-mono text-xs leading-relaxed mb-[1.15rem]">3</span>
                      <span className="text-slate-600 font-mono text-xs leading-relaxed mb-[1.15rem]">4</span>
                      <span className="text-slate-600 font-mono text-xs leading-relaxed mb-[1.15rem]">5</span>
                      <span className="text-slate-600 font-mono text-xs leading-relaxed">6</span>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1">
                      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                        <span className="text-primary/60 font-mono text-base md:text-lg mr-3">
                          &lt;About /&gt;
                        </span>
                        Hi, I'm Samir
                      </h1>
                      <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
                        <p>
                          I'm a software engineer who believes that the best code is
                          clean, intentional, and built with purpose. I love diving
                          deep into systems architecture, whether it's optimizing a
                          microservice or building out my home media server with Docker
                          and Plex.
                        </p>
                        <p>
                          Beyond the terminal, I'm fascinated by the intersection of
                          tech and culture—how music, art, and storytelling shape the
                          way we build and interact with technology. When I'm not
                          writing code, you'll find me exploring new music, tweaking my
                          workspace setup, or learning from the creators who inspire me.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Picture - Second in DOM, Right Column on Desktop */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full md:w-[35%] flex justify-center md:justify-end relative group"
                >
                  <div
                    className="relative rounded-lg overflow-hidden border border-primary/30 bg-background/40 backdrop-blur-xl p-2"
                    style={{
                      boxShadow:
                        "inset 0 0 40px rgba(167, 139, 250, 0.15), 0 0 30px rgba(167, 139, 250, 0.2)",
                    }}
                  >
                    <div
                      className="relative w-full rounded overflow-hidden border border-primary/50 bg-primary/10"
                    >
                      <img
                        src={profileImg}
                        alt="Samir Mahmoud"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      {/* Purple overlay */}
                      <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-300"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workspace Evolution - Masonry Grid */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary/60 font-mono text-sm md:text-base mr-3">
                &lt;Setup /&gt;
              </span>
              Workspace Evolution
            </h2>
            <div className="flex-1 h-px bg-border ml-4"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Masonry columnsCount={3} gutter="1rem">
              {workspaceImages.map((image: any, index: number) => (
                <motion.div
                  key={image.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative rounded-lg overflow-hidden border border-primary/20 bg-background/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                  style={{
                    boxShadow:
                      "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 rgba(167, 139, 250, 0.3)",
                  }}
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(167, 139, 250, 0.6)";
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 rgba(167, 139, 250, 0.3)";
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.alt || "Workspace"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {image.alt && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                      <p className="text-sm text-white/90">
                        {image.alt}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        </div>
      </section>

      {/* Heavy Rotation - Infinite Marquee */}
      <section className="py-20 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 mb-12">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary/60 font-mono text-sm md:text-base mr-3">
                &lt;Music /&gt;
              </span>
              Heavy Rotation
            </h2>
            <div className="flex-1 h-px bg-border ml-4"></div>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #0a0a1a 0%, transparent 100%)",
            }}
          ></div>
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, #0a0a1a 0%, transparent 100%)",
            }}
          ></div>

          {/* Scrolling Marquee */}
          <div className="flex animate-marquee">
            {/* First set */}
            {albums.map((album: any, index: number) => (
              <div
                key={`album-1-${album.id || index}`}
                className="flex-shrink-0 w-48 h-48 mx-3 rounded-lg overflow-hidden border border-primary/20 group hover:border-primary/50 transition-all duration-300"
                style={{
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
                }}
              >
                <img
                  src={album.url}
                  alt={album.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {albums.map((album: any, index: number) => (
              <div
                key={`album-2-${album.id || index}`}
                className="flex-shrink-0 w-48 h-48 mx-3 rounded-lg overflow-hidden border border-primary/20 group hover:border-primary/50 transition-all duration-300"
                style={{
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
                }}
              >
                <img
                  src={album.url}
                  alt={album.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signals in the Noise - 3-Column Grid */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary/60 font-mono text-sm md:text-base mr-3">
                &lt;Inspiration /&gt;
              </span>
              Signals in the Noise
            </h2>
            <div className="flex-1 h-px bg-border ml-4"></div>
          </div>
          <p className="text-slate-400 mb-12 text-sm md:text-base">
            Tech creators who inspire my work and thinking.
          </p>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative rounded-lg border border-border/50 bg-background/80 backdrop-blur-xl p-6 hover:border-primary/50 transition-all duration-300"
                style={{
                  boxShadow:
                    "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(167, 139, 250, 0.05)",
                }}
              >
                {/* Avatar Placeholder */}
                <div className="flex justify-center mb-4">
                  <div
                    className="w-20 h-20 rounded-full border-2 border-primary/40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:border-primary transition-all duration-300"
                    style={{
                      boxShadow:
                        "inset 0 0 30px rgba(167, 139, 250, 0.2), 0 0 20px rgba(167, 139, 250, 0.2)",
                    }}
                  >
                    <span className="text-primary font-mono text-lg font-bold">
                      {creator.name.split(" ")[0].charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Creator Name */}
                <h3 className="text-center text-foreground font-bold text-lg">
                  {creator.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}