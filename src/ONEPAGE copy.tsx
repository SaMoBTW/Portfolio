import React, { useState } from "react";
import {
  User,
  Code,
  Mail,
  Github,
  Linkedin,
  Monitor,
  Edit,
  Plus,
  Trash2,
  GraduationCap,
  Award,
  MapPin,
} from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution built with React and Spring Boot",
    technologies: ["React", "Spring Boot", "PostgreSQL", "Stripe API"],
    github: "https://github.com/samirmahmoud",
    live: "https://demo.com",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management System",
    description: "Collaborative project management tool with real-time updates",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com/samirmahmoud",
    live: "https://demo.com",
    featured: false,
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Data visualization dashboard for business intelligence",
    technologies: ["React", "D3.js", "Python", "FastAPI"],
    github: "https://github.com/samirmahmoud",
    live: "https://demo.com",
    featured: true,
  },
];

const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "JavaScript"],
  },
  {
    category: "Backend",
    items: ["Java", "Spring Boot", "Node.js", "Python", "REST APIs"],
  },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
  {
    category: "Tools",
    items: ["Git", "Docker", "AWS", "Jenkins", "IntelliJ IDEA"],
  },
];

const PAGES = ["home", "about", "projects", "contact", "admin"] as const;

type Page = (typeof PAGES)[number];

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // -----------------------------
  // Navigation
  // -----------------------------
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Samir Mahmoud</h1>
          <div className="flex space-x-6">
            {PAGES.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`capitalize transition-colors cursor-pointer ${
                  currentPage === page
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  // -----------------------------
  // Home Page
  // -----------------------------
  const HomePage = () => (
    <div className="min-h-screen pt-20 flex items-center bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          {/* Greeting */}
          <div className="space-y-4">
            <div className="text-lg text-blue-400 font-medium">
              👋 Hello there! I'm
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Samir
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Mahmoud
              </span>
            </h1>
          </div>

          {/* Role */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
            <div className="relative bg-gray-900 border border-gray-700 rounded-lg px-6 py-4">
              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-blue-400 font-semibold">
                  Aspiring Software Engineer
                </span>{" "}
                &
                <span className="text-purple-400 font-semibold">
                  {" "}
                  Web Developer
                </span>{" "}
                pursuing my Master's in Computer Science. I build modern web
                applications with clean code and user-focused design.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">15+</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">2+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">5+</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage("projects")}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-blue-600/25 hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center">
                View My Projects
                <Code className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage("contact")}
              className="group border-2 border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium hover:bg-blue-500/10 hover:scale-105 cursor-pointer"
            >
              <span className="flex items-center justify-center">
                Get In Touch
                <Mail className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-6 pt-4">
            <span className="text-gray-400 text-sm">Connect with me:</span>
            <div className="flex space-x-4">
              <a
                href="https://github.com/samirmahmoud"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                <Github className="relative w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                <Linkedin className="relative w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110" />
              </a>
              <a href="#contact" aria-label="Email" className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                <Mail className="relative w-6 h-6 text-gray-400 group-hover:text-red-400 transition-all duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced visual element */}
        <div className="relative flex items-center justify-center">
          {/* Animated rings */}
          <div className="absolute inset-0">
            <div
              className="w-96 h-96 border-2 border-blue-500/20 rounded-full animate-spin"
              style={{ animationDuration: "20s" }}
            ></div>
            <div
              className="absolute inset-8 w-80 h-80 border-2 border-purple-500/20 rounded-full animate-spin"
              style={{
                animationDuration: "15s",
                animationDirection: "reverse",
              }}
            ></div>
            <div
              className="absolute inset-16 w-64 h-64 border-2 border-cyan-500/20 rounded-full animate-spin"
              style={{ animationDuration: "10s" }}
            ></div>
          </div>

          {/* Center gradient orb */}
          <div className="relative">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-30 blur-sm animate-pulse"></div>
            <div className="absolute inset-0 w-64 h-64 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full"></div>

            {/* Floating icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Monitor className="w-24 h-24 text-white/80" />
                <div
                  className="absolute -top-8 -right-8 animate-bounce"
                  style={{ animationDelay: "0s", animationDuration: "3s" }}
                >
                  <Code className="w-8 h-8 text-blue-400" />
                </div>
                <div
                  className="absolute -bottom-8 -left-8 animate-bounce"
                  style={{ animationDelay: "1s", animationDuration: "3s" }}
                >
                  <Github className="w-8 h-8 text-purple-400" />
                </div>
                <div
                  className="absolute top-0 -left-12 animate-bounce"
                  style={{ animationDelay: "2s", animationDuration: "3s" }}
                >
                  <div className="w-6 h-6 bg-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick navigation hints */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-6 text-gray-500 text-sm">
          <button
            type="button"
            onClick={() => setCurrentPage("about")}
            className="hover:text-blue-400 transition-colors flex items-center cursor-pointer"
          >
            <User className="w-4 h-4 mr-1" />
            About
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("projects")}
            className="hover:text-purple-400 transition-colors flex items-center cursor-pointer"
          >
            <Code className="w-4 h-4 mr-1" />
            Projects
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("contact")}
            className="hover:text-cyan-400 transition-colors flex items-center cursor-pointer"
          >
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );

  // -----------------------------
  // About Page
  // -----------------------------
  const AboutPage = () => (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <User className="w-6 h-6 mr-3 text-blue-400" />
              Background
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              I'm a passionate software developer currently pursuing my Master's
              in Computer Science, with a solid foundation from my Bachelor's in
              Computer Information Systems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My goal is to create efficient, scalable, and user-friendly
              applications that solve real-world problems.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-blue-400" />
              Education
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-white font-medium">
                  Master of Science in Computer Science
                </h4>
                <p className="text-gray-300 text-sm">University Name</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-400 text-sm">2024 - Present</span>
                  <span className="text-sm px-2 py-1 rounded bg-blue-900 text-blue-300">
                    In Progress
                  </span>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-white font-medium">
                  Bachelor of Science in Computer Information Systems
                </h4>
                <p className="text-gray-300 text-sm">University Name</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-400 text-sm">2020 - 2024</span>
                  <span className="text-sm px-2 py-1 rounded bg-green-900 text-green-300">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
            <Award className="w-6 h-6 mr-3 text-blue-400" />
            Experience
          </h3>
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h4 className="text-white font-semibold text-lg">
                  Software Development Intern
                </h4>
                <span className="text-blue-400 font-medium">Tech Company</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">Summer 2023</p>
              <p className="text-gray-300">
                Developed web applications using React and Spring Boot
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h4 className="text-white font-semibold text-lg">
                  Teaching Assistant
                </h4>
                <span className="text-blue-400 font-medium">
                  University Name
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-3">2023 - 2024</p>
              <p className="text-gray-300">
                Assisted students with programming concepts and project
                development
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
            <Code className="w-6 h-6 mr-3 text-blue-400" />
            Skills & Technologies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skillGroup, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-white font-semibold mb-4">
                  {skillGroup.category}
                </h4>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-gray-300 text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // -----------------------------
  // Projects Page
  // -----------------------------
  const ProjectsPage = () => (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Projects
        </h2>
        <p className="text-gray-300 text-center mb-12">
          Here are some of the projects I've been working on
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
            >
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                <Monitor className="w-16 h-16 text-gray-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm cursor-pointer"
                  >
                    <Github className="w-4 h-4 inline mr-1" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm cursor-pointer"
                  >
                    <Monitor className="w-4 h-4 inline mr-1" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // -----------------------------
  // Contact Page
  // -----------------------------
  const ContactPage = () => (
    <div id="contact" className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Get In Touch
        </h2>
        <p className="text-gray-300 text-center mb-12">
          I'm always open to discussing new opportunities and interesting
          projects
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">samir.mahmoud@email.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">Available for Remote Work</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">
                Connect With Me
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/samirmahmoud"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="cursor-pointer"
                >
                  <Github className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="cursor-pointer"
                >
                  <Linkedin className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
                </a>
                <a
                  href="#contact"
                  aria-label="Email"
                  className="cursor-pointer"
                >
                  <Mail className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Mock form (non-functional) */}
          <div>
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                />
              </div>
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // -----------------------------
  // Admin Page
  // -----------------------------
  const AdminPage = () => (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">Admin Dashboard</h2>
          <button
            type="button"
            onClick={() => {
              /* no-op in mock */
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer"
            title="Mock-only action"
            aria-disabled="true"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
        </div>

        {/* Always show Manage Projects (no login gate) */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">Manage Projects</h3>
          <div className="grid gap-6">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 p-6 rounded-lg flex justify-between items-start"
              >
                <div>
                  <h4 className="text-white font-semibold text-lg mb-2">
                    {project.title}
                  </h4>
                  <p className="text-gray-300 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 p-2 cursor-pointer"
                    title="Edit (mock)"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300 p-2 cursor-pointer"
                    title="Delete (mock)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navigation />
      {currentPage === "home" && <HomePage />}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "projects" && <ProjectsPage />}
      {currentPage === "contact" && <ContactPage />}
      {currentPage === "admin" && <AdminPage />}
    </div>
  );
}
