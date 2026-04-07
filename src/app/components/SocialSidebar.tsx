import { Github, Linkedin, Youtube, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";

export function SocialSidebar() {
  const [scrollRange, setScrollRange] = useState({ start: 0, end: 0 });
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const updateScrollRange = () => {
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = docHeight - windowHeight;
      
      setScrollRange({
        start: maxScroll - 300, // Start fading 300px before bottom
        end: maxScroll - 100,    // Fully hidden 100px before bottom
      });
    };
    
    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);
  
  // Calculate opacity based on scroll position relative to page bottom
  const opacity = useTransform(
    scrollY,
    [scrollRange.start, scrollRange.end],
    [1, 0]
  );

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <>
      {/* Left - Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        style={{ opacity }}
        className="hidden xl:flex fixed left-10 bottom-0 flex-col items-center gap-6 z-40"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            whileHover={{ y: -3, color: "#a78bfa" }}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={social.label}
          >
            <social.icon size={20} />
          </motion.a>
        ))}
        <div className="w-px h-24 bg-border"></div>
      </motion.div>

      {/* Right - Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{ opacity }}
        className="hidden xl:flex fixed right-10 bottom-0 flex-col items-center gap-6 z-40"
      >
        <a
          href="mailto:hello@example.com"
          className="text-muted-foreground hover:text-primary transition-colors font-mono text-xs tracking-wide vertical-text"
          style={{
            writingMode: "vertical-rl",
          }}
        >
          hello@example.com
        </a>
        <div className="w-px h-24 bg-border"></div>
      </motion.div>
    </>
  );
}