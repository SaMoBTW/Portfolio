export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
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
