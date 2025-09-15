import { Edit, Plus, Trash2 } from "lucide-react";
import { PROJECTS } from "../data/Project";

type Props = {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
};

export default function AdminPage(_props: Props) {
  return (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">Admin Dashboard</h2>
          <button
            type="button"
            onClick={() => {}}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer"
            title="Mock-only action"
            aria-disabled="true"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">Manage Projects</h3>
          <div className="grid gap-6">
            {PROJECTS.map((project) => (
              <div key={project.id} className="bg-gray-800 p-6 rounded-lg flex justify-between items-start">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-2">{project.title}</h4>
                  <p className="text-gray-300 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
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
}
