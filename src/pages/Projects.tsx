import { Github, Monitor } from "lucide-react";
import { PROJECTS } from "../data/Project";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">Projects</h2>
        <p className="text-gray-300 text-center mb-12">Here are some of the projects I've been working on</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                <Monitor className="w-16 h-16 text-gray-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Featured</span>
                  )}
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
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
}
