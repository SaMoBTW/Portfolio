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
import { projects } from "../data/projects";

interface Props {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const AdminPage: React.FC<Props> = ({ isAdmin, setIsAdmin }) => {
  return (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        {!isAdmin ? (
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-white font-semibold mb-4">
              Admin Access Required
            </h3>
            <button
              onClick={() => setIsAdmin(true)}
              className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
            >
              Login (Demo)
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">
              Admin Dashboard
            </h2>
            <button className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 flex items-center mb-6">
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </button>
            <div className="space-y-6">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-gray-800 p-6 rounded-lg flex justify-between"
                >
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      {p.title}
                    </h4>
                    <p className="text-gray-300">{p.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
