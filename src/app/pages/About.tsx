import { motion } from "motion/react";
import Masonry from "react-responsive-masonry";
import { FileCode } from "lucide-react";
import profileImg from "../../assets/d7db82655c6674b4948dd2ab7cad4334dee31f29.png";

export function About() {
  // Workspace Evolution images with varying heights
  const workspaceImages = [
    {
      url: "https://images.unsplash.com/photo-1555209183-8facf96a4349?w=600&q=80",
      height: "h-64",
      caption: "2020 - The Beginning",
    },
    {
      url: "https://images.unsplash.com/photo-1644337540803-2b2fb3cebf12?w=600&q=80",
      height: "h-80",
      caption: "2021 - Minimalist Phase",
    },
    {
      url: "https://images.unsplash.com/photo-1623281185000-6940e5347d2e?w=600&q=80",
      height: "h-72",
      caption: "2023 - Multi-monitor Setup",
    },
    {
      url: "https://images.unsplash.com/photo-1648241776507-7e3ae32698e6?w=600&q=80",
      height: "h-96",
      caption: "2024 - Current Setup",
    },
  ];

  // Album covers for infinite marquee
  const albums = [
    { url: "https://images.unsplash.com/photo-1773408285355-a1d4a141ea1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjByYXAlMjBhbGJ1bSUyMGNvdmVyJTIwYXJ0fGVufDF8fHx8MTc3NTUwNDM2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", title: "Octane - Don Toliver" },
    { url: "https://images.unsplash.com/photo-1609793463612-db1954fbfb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKJTIwQ29sZSUyMGhpcCUyMGhvcCUyMGFydGlzdCUyMGNvbmNlcnR8ZW58MXx8fHwxNzc1NTA0NTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", title: "The Off-Season - J. Cole" },
    { url: "https://images.unsplash.com/photo-1644855640845-ab57a047320e?w=300&q=80", title: "Album 1" },
    { url: "https://images.unsplash.com/photo-1638109879562-1f98abe0d45f?w=300&q=80", title: "Album 2" },
    { url: "https://images.unsplash.com/photo-1631692364524-f369d797b107?w=300&q=80", title: "Album 3" },
    { url: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&q=80", title: "Album 4" },
    { url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80", title: "Album 5" },
    { url: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&q=80", title: "Album 6" },
    { url: "https://images.unsplash.com/photo-1579082198414-4f5c7cccce12?w=300&q=80", title: "Album 7" },
    { url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80", title: "Album 8" },
  ];

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
              {workspaceImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative rounded-lg overflow-hidden border border-primary/20 bg-background/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                  style={{
                    boxShadow:
                      "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 rgba(167, 139, 250, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(167, 139, 250, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 rgba(167, 139, 250, 0.3)";
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-mono text-sm">{image.caption}</p>
                    </div>
                  </div>
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
            {albums.map((album, index) => (
              <div
                key={`album-1-${index}`}
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
            {albums.map((album, index) => (
              <div
                key={`album-2-${index}`}
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