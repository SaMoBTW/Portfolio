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
  Calendar,
} from "lucide-react";
import { projects } from "../data/Projects";

const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold text-white">{p.title}</h3>
              <p className="text-gray-300 mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a
                  href={p.github}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                >
                  <Github className="w-4 h-4 mr-1" /> Code
                </a>
                <a
                  href={p.live}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                >
                  <Monitor className="w-4 h-4 mr-1" /> Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
